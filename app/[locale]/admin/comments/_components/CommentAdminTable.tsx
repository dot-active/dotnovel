'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

interface CommentRow {
  id: string
  content: string
  userId: string | null
  nickname: string | null
  userName: string | null
  ipAddress: string | null
  novelId: string
  novelTitle: string
  chapterTitle: string
  paragraphIndex: number
  isDeleted: boolean
  createdAt: string
  parentContent: string | null
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function callDelete(id: string, soft: boolean) {
  await fetch(`/api/admin/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ soft }),
  })
}

async function callRestore(id: string) {
  await fetch(`/api/admin/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isDeleted: false }),
  })
}

async function callBulkDelete(ids: string[], soft: boolean) {
  await fetch('/api/admin/comments/bulk', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids, soft }),
  })
}

export default function CommentAdminTable({ comments }: { comments: CommentRow[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [confirming, setConfirming] = useState<{ id: string; soft: boolean } | null>(null)
  const [confirmingBulk, setConfirmingBulk] = useState<'soft' | 'hard' | null>(null)

  const allSelected = comments.length > 0 && selected.size === comments.length

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(comments.map((c) => c.id)))
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleAction(action: () => Promise<void>) {
    startTransition(async () => {
      await action()
      router.refresh()
    })
    setConfirming(null)
  }

  function handleBulkAction(soft: boolean) {
    const ids = Array.from(selected)
    startTransition(async () => {
      await callBulkDelete(ids, soft)
      router.refresh()
    })
    setSelected(new Set())
    setConfirmingBulk(null)
  }

  return (
    <div>
      {selected.size > 0 && (
        <div className={styles.bulkBar}>
          <span className={styles.bulkCount}>已选中 {selected.size} 条</span>
          {confirmingBulk ? (
            <>
              <span className={styles.bulkConfirmText}>
                确认{confirmingBulk === 'soft' ? '删除' : '永久删除'}选中的留言？
              </span>
              <button
                className={styles.btnDangerConfirm}
                disabled={isPending}
                onClick={() => handleBulkAction(confirmingBulk === 'soft')}
              >
                确认
              </button>
              <button className={styles.btnCancel} onClick={() => setConfirmingBulk(null)}>取消</button>
            </>
          ) : (
            <>
              <button className={styles.btnDanger} disabled={isPending} onClick={() => setConfirmingBulk('soft')}>
                批量删除
              </button>
              <button className={styles.btnDangerConfirm} disabled={isPending} onClick={() => setConfirmingBulk('hard')}>
                批量永久删除
              </button>
            </>
          )}
        </div>
      )}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCheckbox}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              </th>
              <th>内容</th>
              <th>用户</th>
              <th>IP地址</th>
              <th>小说/章节</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id} className={`${styles.row} ${c.isDeleted ? styles.rowDeleted : ''}`}>
                <td>
                  <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleOne(c.id)} />
                </td>
                <td className={styles.tdContent}>
                  {c.isDeleted ? (
                    <span className={styles.deletedText}>该留言已删除</span>
                  ) : (
                    <>
                      {c.parentContent && (
                        <span className={styles.replyTag}>
                          ↩ 回复：{c.parentContent.slice(0, 20)}
                        </span>
                      )}
                      {c.content.slice(0, 50)}
                    </>
                  )}
                </td>
                <td>
                  {c.userId ? (
                    <span className={styles.userName}>{c.userName}</span>
                  ) : (
                    <span className={styles.anonUser}>
                      {c.nickname || '匿名用户'}
                      <span className={styles.anonTag}>匿名</span>
                    </span>
                  )}
                </td>
                <td className={styles.tdMono}>{c.userId ? '-' : (c.ipAddress ?? '-')}</td>
                <td className={styles.tdChapter}>
                  <span className={styles.novelName}>{c.novelTitle}</span>
                  <span className={styles.chapterName}>{c.chapterTitle} · 第{c.paragraphIndex + 1}段</span>
                </td>
                <td className={styles.tdTime}>{formatTime(c.createdAt)}</td>
                <td className={styles.tdActions}>
                  {confirming?.id === c.id ? (
                    <>
                      <span className={styles.bulkConfirmText}>
                        确认{confirming.soft ? '删除' : '永久删除'}？
                      </span>
                      <button
                        className={styles.btnDangerConfirm}
                        disabled={isPending}
                        onClick={() => handleAction(() => callDelete(c.id, confirming.soft))}
                      >
                        确认
                      </button>
                      <button className={styles.btnCancel} onClick={() => setConfirming(null)}>取消</button>
                    </>
                  ) : (
                    <>
                      {c.isDeleted ? (
                        <button
                          className={styles.btnRestore}
                          disabled={isPending}
                          onClick={() => handleAction(() => callRestore(c.id))}
                        >
                          恢复
                        </button>
                      ) : (
                        <button
                          className={styles.btnDanger}
                          disabled={isPending}
                          onClick={() => setConfirming({ id: c.id, soft: true })}
                        >
                          删除
                        </button>
                      )}
                      <button
                        className={styles.btnDangerConfirm}
                        disabled={isPending}
                        onClick={() => setConfirming({ id: c.id, soft: false })}
                      >
                        永久删除
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
