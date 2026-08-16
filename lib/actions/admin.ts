'use server'

import { clerkClient } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAuthRole } from '@/lib/auth'

async function assertAdmin() {
  const { userId, isAdmin } = await getAuthRole()
  if (!userId) throw new Error('Unauthorized')
  if (!isAdmin) throw new Error('Forbidden')
}

// ── Novels ──────────────────────────────────────────────────────────────────

export async function toggleNovelPublishStatus(formData: FormData) {
  await assertAdmin()
  const novelId = formData.get('novelId') as string
  const currentStatus = formData.get('currentStatus') as string
  const newStatus = currentStatus === 'published' ? 'unpublished' : 'published'

  await prisma.novel.update({
    where: { id: novelId },
    data: { publishStatus: newStatus },
  })

  revalidatePath('/', 'layout')
}

export async function deleteNovelAdmin(formData: FormData) {
  await assertAdmin()
  const novelId = formData.get('novelId') as string

  // Use a transaction; cascade deletes handle all related records automatically
  await prisma.$transaction(async (tx) => {
    await tx.novel.delete({ where: { id: novelId } })
  })

  revalidatePath('/', 'layout')
}

// ── Users ────────────────────────────────────────────────────────────────────

export async function banUser(formData: FormData) {
  await assertAdmin()
  const userId = formData.get('userId') as string
  const client = await clerkClient()
  await client.users.banUser(userId)
  revalidatePath('/[locale]/admin/users')
}

export async function unbanUser(formData: FormData) {
  await assertAdmin()
  const userId = formData.get('userId') as string
  const client = await clerkClient()
  await client.users.unbanUser(userId)
  revalidatePath('/[locale]/admin/users')
}

export async function toggleNovelFeatured(formData: FormData) {
  await assertAdmin()
  const novelId = formData.get('novelId') as string
  const current = formData.get('isFeatured') === 'true'

  await prisma.novel.update({
    where: { id: novelId },
    data: { isFeatured: !current },
  })

  revalidatePath('/', 'layout')
}

// ── Novel stats ──────────────────────────────────────────────────────────────

export async function updateNovelStats(formData: FormData) {
  await assertAdmin()
  const novelId = formData.get('novelId') as string
  const viewCount = parseInt(formData.get('viewCount') as string, 10)
  const favoriteCount = parseInt(formData.get('favoriteCount') as string, 10)

  if (isNaN(viewCount) || isNaN(favoriteCount)) throw new Error('Invalid numbers')

  const novel = await prisma.novel.findUnique({
    where: { id: novelId },
    select: { authorId: true, viewCount: true },
  })
  if (!novel) throw new Error('Novel not found')

  // 手动改高阅读数时，按增加的差值同步给作者加积分
  const delta = viewCount - novel.viewCount
  const authorId = novel.authorId

  await prisma.$transaction(async (tx) => {
    await tx.novel.update({
      where: { id: novelId },
      data: { viewCount, favoriteCount },
    })

    if (authorId && delta > 0) {
      await tx.authorPoints.upsert({
        where: { userId: authorId },
        update: { points: { increment: delta } },
        create: { userId: authorId, points: delta },
      })
      await tx.authorPointsLog.create({
        data: {
          userId: authorId,
          points: delta,
          reason: `Admin 修改阅读数（+${delta}次）`,
          novelId,
        },
      })
    }
  })

  revalidatePath('/[locale]/admin/novels')
}

// ── Categories ───────────────────────────────────────────────────────────────

export async function createCategory(formData: FormData) {
  await assertAdmin()
  const slug = (formData.get('slug') as string ?? '').trim().toLowerCase()
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  await prisma.category.create({ data: { slug } })
  revalidatePath('/[locale]/admin/categories')
}

export async function deleteCategory(formData: FormData) {
  await assertAdmin()
  const categoryId = formData.get('categoryId') as string

  const novelCount = await prisma.novelCategory.count({ where: { categoryId } })
  if (novelCount > 0) throw new Error(`该分类下有 ${novelCount} 部小说，无法删除`)

  await prisma.category.delete({ where: { id: categoryId } })
  revalidatePath('/[locale]/admin/categories')
}
