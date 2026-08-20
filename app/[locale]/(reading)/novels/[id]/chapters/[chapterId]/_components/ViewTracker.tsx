'use client'

import { useEffect } from 'react'

interface Props {
  novelId: string
  chapterId: string
  userId: string | null
}

export default function ViewTracker({ novelId, chapterId, userId }: Props) {
  useEffect(() => {
    fetch(`/api/novels/${novelId}/view`, { method: 'POST' })
  }, [novelId])

  useEffect(() => {
    if (!userId) return
    fetch(`/api/chapters/${chapterId}/read`, { method: 'POST' })
  }, [chapterId, userId])

  return null
}
