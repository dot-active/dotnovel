'use client'

import { useState, type ReactNode } from 'react'
import styles from './VolumeAccordion.module.css'

interface Props {
  title: string
  count: number
  defaultOpen?: boolean
  children: ReactNode
}

export default function VolumeAccordion({ title, count, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={styles.vol}>
      <button
        className={styles.head}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        type="button"
      >
        <span className={styles.icon}>{open ? '▼' : '▶'}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.count}>{count}</span>
      </button>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  )
}
