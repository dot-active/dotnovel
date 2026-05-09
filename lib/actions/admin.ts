'use server'

import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await currentUser()
  if (user?.publicMetadata?.role !== 'admin') throw new Error('Forbidden')
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

  const novelCount = await prisma.novel.count({ where: { categoryId } })
  if (novelCount > 0) throw new Error(`该分类下有 ${novelCount} 部小说，无法删除`)

  await prisma.category.delete({ where: { id: categoryId } })
  revalidatePath('/[locale]/admin/categories')
}
