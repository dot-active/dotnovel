'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { tasks } from '@trigger.dev/sdk/v3'
import type { translateChapter } from '@/src/trigger/translateChapter'
import type { translateNovel } from '@/src/trigger/translateNovel'

export async function createNovel(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const categoryIds = formData.getAll('categoryIds') as string[]
  const targetLocales = formData.getAll('targetLocales') as string[]
  const sourceLocale = formData.get('sourceLocale') as string
  const coverUrl = (formData.get('coverUrl') as string) || null
  const locale = formData.get('locale') as string

  if (!title?.trim() || !description?.trim() || !sourceLocale) {
    throw new Error('Required fields missing')
  }

  const user = await currentUser()
  const authorName = user?.firstName || user?.username || 'Anonymous'

  const novel = await prisma.novel.create({
    data: {
      title: title.trim(),
      author: authorName,
      description: description.trim(),
      authorId: userId,
      sourceLocale,
      publishStatus: 'published',
      coverUrl,
    },
  })

  await prisma.novelTranslation.create({
    data: {
      novelId: novel.id,
      locale: sourceLocale,
      title: title.trim(),
      description: description.trim(),
    },
  })

  for (const categoryId of categoryIds.filter(Boolean)) {
    await prisma.novelCategory.create({ data: { novelId: novel.id, categoryId } })
  }

  for (const targetLocale of targetLocales.filter(Boolean)) {
    const trReq = await prisma.translationRequest.create({
      data: { novelId: novel.id, targetLocale, status: 'pending' },
    })

    try {
      const handle = await tasks.trigger<typeof translateNovel>('translate-novel', {
        translationRequestId: trReq.id,
        novelId: novel.id,
        targetLocale,
      })
      await prisma.translationRequest.update({
        where: { id: trReq.id },
        data: { triggerRunId: handle.id },
      })
    } catch (err) {
      await prisma.translationRequest.update({
        where: { id: trReq.id },
        data: { status: 'failed', errorMessage: 'Failed to queue translation job' },
      })
    }
  }

  redirect(`/${locale}/author/novels/${novel.id}/chapters/new`)
}

export async function createChapter(
  formData: FormData
): Promise<{ redirectUrl: string; error?: never } | { error: string; redirectUrl?: never }> {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }

  const novelId = formData.get('novelId') as string
  const title = (formData.get('title') as string).trim()
  const content = (formData.get('content') as string).trim()
  const sourceLocale = formData.get('sourceLocale') as string
  const browsingLocale = (formData.get('browsingLocale') as string) || sourceLocale
  const order = parseInt(formData.get('order') as string, 10)
  const publishStatus = (formData.get('publishStatus') as string) || 'published'
  const continueAdding = formData.get('continueAdding') === 'true'
  const volumeId = (formData.get('volumeId') as string) || null

  if (!title || !content) return { error: 'Title and content are required' }
  if (isNaN(order)) return { error: 'Invalid chapter order' }

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return { error: 'Novel not found or not authorized' }

  const chapter = await prisma.chapter.create({
    data: { novelId, volumeId, title, content, order, publishStatus },
  })

  await prisma.chapterTranslation.create({
    data: { chapterId: chapter.id, locale: sourceLocale, title, content },
  })

  if (publishStatus === 'published') {
    const completedRequests = await prisma.translationRequest.findMany({
      where: { novelId, status: { in: ['completed', 'published'] } },
      select: { targetLocale: true },
    })
    for (const { targetLocale } of completedRequests) {
      if (targetLocale !== sourceLocale) {
        await tasks.trigger<typeof translateChapter>('translate-chapter', {
          chapterId: chapter.id,
          novelId,
          sourceLocale,
          targetLocale,
        })
      }
    }
  }

  revalidatePath(`/${browsingLocale}/author/novels/${novelId}/chapters`)

  if (continueAdding && publishStatus === 'published') {
    return { redirectUrl: `/${browsingLocale}/author/novels/${novelId}/chapters/new?order=${order + 1}` }
  }
  return { redirectUrl: `/${browsingLocale}/author/novels/${novelId}/chapters` }
}

export async function updateNovel(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const novelId = formData.get('novelId') as string
  const title = (formData.get('title') as string).trim()
  const description = (formData.get('description') as string).trim()
  const locale = formData.get('locale') as string
  const editLocale = (formData.get('editLocale') as string) || ''

  if (!title || !description) throw new Error('Title and description are required')

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) throw new Error('Novel not found or not authorized')

  const targetLocale = editLocale || novel.sourceLocale

  // Editing a translated language version: title/description are the only
  // language-specific fields, so just update that NovelTranslation record.
  // Revalidate instead of redirecting — the author stays on the same edit
  // page/locale, and redirecting to the current URL leaves the client stuck.
  if (targetLocale !== novel.sourceLocale) {
    await prisma.novelTranslation.upsert({
      where: { novelId_locale: { novelId, locale: targetLocale } },
      update: { title, description },
      create: { novelId, locale: targetLocale, title, description },
    })

    revalidatePath(`/${locale}/author/novels/${novelId}/edit`)
    return
  }

  const categoryIds = formData.getAll('categoryIds') as string[]
  const status = (formData.get('status') as string) || 'ONGOING'
  const newCoverUrl = (formData.get('coverUrl') as string) || null
  const isAdult = formData.get('isAdult') === 'true'

  const user = await currentUser()
  const authorName = user?.firstName || user?.username || novel.author

  await prisma.novelCategory.deleteMany({ where: { novelId } })

  await prisma.novel.update({
    where: { id: novelId },
    data: {
      title,
      author: authorName,
      description,
      isAdult,
      status: status as 'ONGOING' | 'COMPLETED' | 'HIATUS',
      ...(newCoverUrl ? { coverUrl: newCoverUrl } : {}),
    },
  })

  for (const categoryId of categoryIds.filter(Boolean)) {
    await prisma.novelCategory.create({ data: { novelId, categoryId } })
  }

  await prisma.novelTranslation.upsert({
    where: { novelId_locale: { novelId, locale: novel.sourceLocale } },
    update: { title, description },
    create: { novelId, locale: novel.sourceLocale, title, description },
  })

  redirect(`/${locale}/author/dashboard`)
}

export async function updateChapter(
  formData: FormData
): Promise<{ redirectUrl: string; error?: never } | { error: string; redirectUrl?: never }> {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }

  const chapterId = formData.get('chapterId') as string
  const novelId = formData.get('novelId') as string
  const title = (formData.get('title') as string).trim()
  const content = (formData.get('content') as string).trim()
  const order = parseInt(formData.get('order') as string, 10)
  const publishStatus = (formData.get('publishStatus') as string) || 'published'
  const browsingLocale = formData.get('browsingLocale') as string
  const editLocale = formData.get('editLocale') as string | null
  const volumeId = (formData.get('volumeId') as string) || null
  const retranslateLocales = (formData.getAll('retranslateLocales') as string[]).filter(Boolean)

  if (!title || !content) return { error: 'Title and content are required' }
  if (isNaN(order)) return { error: 'Invalid chapter order' }

  const chapter = await prisma.chapter.findFirst({
    where: { id: chapterId },
    include: { novel: { select: { authorId: true, sourceLocale: true } } },
  })
  if (!chapter || chapter.novel.authorId !== userId) return { error: 'Not authorized' }

  const targetLocale = editLocale || chapter.novel.sourceLocale
  const sourceLocale = chapter.novel.sourceLocale

  if (targetLocale === sourceLocale) {
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { title, content, order, publishStatus, volumeId },
    })
  } else {
    // Only update structural fields; publishStatus belongs to each locale's ChapterTranslation
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { order, volumeId },
    })
  }

  await prisma.chapterTranslation.upsert({
    where: { chapterId_locale: { chapterId, locale: targetLocale } },
    update: { title, content, status: publishStatus },
    create: { chapterId, locale: targetLocale, title, content, status: publishStatus },
  })

  if (targetLocale === sourceLocale) {
    const locales = retranslateLocales.filter((loc) => loc !== sourceLocale)
    if (locales.length > 0) {
      await prisma.chapterTranslation.deleteMany({
        where: { chapterId, locale: { in: locales } },
      })
      for (const loc of locales) {
        await tasks.trigger<typeof translateChapter>('translate-chapter', {
          chapterId,
          novelId,
          sourceLocale,
          targetLocale: loc,
        })
      }
    }
  }

  revalidatePath(`/${browsingLocale}/author/novels/${novelId}/chapters`)

  return { redirectUrl: `/${browsingLocale}/author/novels/${novelId}/chapters` }
}

export async function deleteChapter(
  formData: FormData
): Promise<{ redirectUrl: string; error?: never } | { error: string; redirectUrl?: never }> {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }

  const chapterId = formData.get('chapterId') as string
  const novelId = formData.get('novelId') as string
  const locale = formData.get('locale') as string

  const chapter = await prisma.chapter.findFirst({
    where: { id: chapterId },
    include: { novel: { select: { authorId: true } } },
  })
  if (!chapter || chapter.novel.authorId !== userId) return { error: 'Not found or not authorized' }

  await prisma.chapter.delete({ where: { id: chapterId } })

  revalidatePath(`/${locale}/author/novels/${novelId}/chapters`)
  return { redirectUrl: `/${locale}/author/novels/${novelId}/chapters` }
}

export async function deleteNovel(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const novelId = formData.get('novelId') as string
  const locale = formData.get('locale') as string

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) throw new Error('Novel not found or not authorized')

  await prisma.novel.delete({ where: { id: novelId } })

  revalidatePath(`/${locale}/author/dashboard`)
  redirect(`/${locale}/author/dashboard`)
}
