'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

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
    await prisma.translationRequest.create({
      data: { novelId: novel.id, targetLocale, status: 'pending' },
    })
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

  if (!title || !content) return { error: 'Title and content are required' }
  if (isNaN(order)) return { error: 'Invalid chapter order' }

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) return { error: 'Novel not found or not authorized' }

  const chapter = await prisma.chapter.create({
    data: { novelId, title, content, order, publishStatus },
  })

  await prisma.chapterTranslation.create({
    data: { chapterId: chapter.id, locale: sourceLocale, title, content },
  })

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
  const categoryIds = formData.getAll('categoryIds') as string[]
  const status = (formData.get('status') as string) || 'ONGOING'
  const newCoverUrl = (formData.get('coverUrl') as string) || null
  const isAdult = formData.get('isAdult') === 'true'
  const locale = formData.get('locale') as string

  if (!title || !description) throw new Error('Title and description are required')

  const [novel, user] = await Promise.all([
    prisma.novel.findFirst({ where: { id: novelId, authorId: userId } }),
    currentUser(),
  ])
  if (!novel) throw new Error('Novel not found or not authorized')

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

  if (!title || !content) return { error: 'Title and content are required' }
  if (isNaN(order)) return { error: 'Invalid chapter order' }

  const chapter = await prisma.chapter.findFirst({
    where: { id: chapterId },
    include: { novel: { select: { authorId: true, sourceLocale: true } } },
  })
  if (!chapter || chapter.novel.authorId !== userId) return { error: 'Not authorized' }

  const targetLocale = editLocale || chapter.novel.sourceLocale

  if (targetLocale === chapter.novel.sourceLocale) {
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { title, content, order, publishStatus },
    })
  } else {
    // Only update structural fields; publishStatus belongs to each locale's ChapterTranslation
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { order },
    })
  }

  await prisma.chapterTranslation.upsert({
    where: { chapterId_locale: { chapterId, locale: targetLocale } },
    update: { title, content, status: publishStatus },
    create: { chapterId, locale: targetLocale, title, content, status: publishStatus },
  })

  revalidatePath(`/${browsingLocale}/author/novels/${novelId}/chapters`)

  return { redirectUrl: `/${browsingLocale}/author/novels/${novelId}/chapters` }
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
