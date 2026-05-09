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
  const penName = (formData.get('penName') as string).trim()
  const categoryId = (formData.get('categoryId') as string) || null
  const sourceLocale = formData.get('sourceLocale') as string
  const coverUrl = (formData.get('coverUrl') as string) || null
  const locale = formData.get('locale') as string

  if (!title?.trim() || !description?.trim() || !sourceLocale) {
    throw new Error('Required fields missing')
  }

  let authorName = penName
  if (!authorName) {
    const user = await currentUser()
    authorName = user?.fullName || user?.username || 'Anonymous'
  }

  const novel = await prisma.novel.create({
    data: {
      title: title.trim(),
      author: authorName,
      description: description.trim(),
      authorId: userId,
      categoryId,
      sourceLocale,
      publishStatus: 'published',
      coverUrl,
      translations: {
        create: {
          locale: sourceLocale,
          title: title.trim(),
          description: description.trim(),
        },
      },
    },
  })

  redirect(`/${locale}/author/novels/${novel.id}/chapters/new`)
}

// Returns the next URL so the client component can navigate — server-side
// redirect() inside an action called from a client component is unreliable.
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

  await prisma.chapter.create({
    data: {
      novelId,
      title,
      content,
      order,
      publishStatus,
      translations: {
        create: { locale: sourceLocale, title, content },
      },
    },
  })

  // Bust the chapter list cache so the new chapter (including drafts) is visible immediately
  revalidatePath(`/${browsingLocale}/author/novels/${novelId}/chapters`)

  if (continueAdding && publishStatus === 'published') {
    return { redirectUrl: `/${browsingLocale}/author/novels/${novelId}/chapters/new?order=${order + 1}` }
  }
  // Always send user to chapter list after save/draft so they can see the result
  return { redirectUrl: `/${browsingLocale}/author/novels/${novelId}/chapters` }
}

export async function updateNovel(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const novelId = formData.get('novelId') as string
  const title = (formData.get('title') as string).trim()
  const description = (formData.get('description') as string).trim()
  const penName = (formData.get('penName') as string).trim()
  const categoryId = (formData.get('categoryId') as string) || null
  const status = (formData.get('status') as string) || 'ONGOING'
  const newCoverUrl = (formData.get('coverUrl') as string) || null
  const isAdult = formData.get('isAdult') === 'true'
  const locale = formData.get('locale') as string

  if (!title || !description) throw new Error('Title and description are required')

  const novel = await prisma.novel.findFirst({ where: { id: novelId, authorId: userId } })
  if (!novel) throw new Error('Novel not found or not authorized')

  await prisma.novel.update({
    where: { id: novelId },
    data: {
      title,
      author: penName || novel.author,
      description,
      categoryId,
      isAdult,
      status: status as 'ONGOING' | 'COMPLETED' | 'HIATUS',
      ...(newCoverUrl ? { coverUrl: newCoverUrl } : {}),
    },
  })

  // Keep source locale translation in sync
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

  if (!title || !content) return { error: 'Title and content are required' }
  if (isNaN(order)) return { error: 'Invalid chapter order' }

  const chapter = await prisma.chapter.findFirst({
    where: { id: chapterId },
    include: { novel: { select: { authorId: true, sourceLocale: true } } },
  })
  if (!chapter || chapter.novel.authorId !== userId) return { error: 'Not authorized' }

  await prisma.chapter.update({
    where: { id: chapterId },
    data: { title, content, order, publishStatus },
  })

  await prisma.chapterTranslation.upsert({
    where: { chapterId_locale: { chapterId, locale: chapter.novel.sourceLocale } },
    update: { title, content },
    create: { chapterId, locale: chapter.novel.sourceLocale, title, content },
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

  // Cascade in schema handles: chapters, chapter_translations,
  // novel_translations, favorites, translation_requests
  await prisma.novel.delete({ where: { id: novelId } })

  revalidatePath(`/${locale}/author/dashboard`)
  redirect(`/${locale}/author/dashboard`)
}
