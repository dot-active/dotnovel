'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { updateChapter } from '@/lib/actions/author'
import styles from './EditChapterForm.module.css'

const ALL_LOCALES = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'es', label: 'Español' },
]

interface ChapterTranslation {
  locale: string
  title: string
  content: string
  status: string
}

interface ChapterData {
  id: string
  novelId: string
  title: string
  content: string
  order: number
  publishStatus: string
  sourceLocale: string
  translations: ChapterTranslation[]
}

interface Props {
  chapter: ChapterData
  locale: string
  novelLocales: string[]
}

export default function EditChapterForm({ chapter, locale, novelLocales }: Props) {
  const t = useTranslations('author.form')
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sourceTr = chapter.translations.find((tr) => tr.locale === chapter.sourceLocale)
  const [selectedLocale, setSelectedLocale] = useState(chapter.sourceLocale)
  const [editTitle, setEditTitle] = useState(chapter.title)
  const [editContent, setEditContent] = useState(chapter.content)
  const [selectedStatus, setSelectedStatus] = useState<'draft' | 'published'>(
    (sourceTr?.status ?? chapter.publishStatus) === 'published' ? 'published' : 'draft'
  )

  function handleLocaleChange(newLocale: string) {
    const tr = chapter.translations.find((tr) => tr.locale === newLocale)
    setSelectedLocale(newLocale)
    setEditTitle(tr?.title ?? '')
    setEditContent(tr?.content ?? '')
    setSelectedStatus(tr?.status === 'published' ? 'published' : 'draft')
  }

  async function handleSubmit(publishStatus: 'published' | 'draft') {
    setSubmitting(publishStatus)
    setError(null)

    try {
      const formData = new FormData(formRef.current!)
      formData.set('chapterId', chapter.id)
      formData.set('novelId', chapter.novelId)
      formData.set('browsingLocale', locale)
      formData.set('editLocale', selectedLocale)
      formData.set('publishStatus', publishStatus)

      const result = await updateChapter(formData)
      if ('error' in result && result.error) {
        setError(result.error)
        return
      }
      if (result.redirectUrl) {
        router.push(result.redirectUrl)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSubmitting(null)
    }
  }

  const busy = submitting !== null
  const currentTranslation = chapter.translations.find((tr) => tr.locale === selectedLocale)

  return (
    <form ref={formRef} className={styles.form}>
      <div className={styles.row}>
        <div className={styles.field} style={{ flex: '1 1 auto' }}>
          <label className={styles.label}>
            {t('chapterTitle')} <span className={styles.required}>*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder={t('chapterTitlePlaceholder')}
            className={styles.input}
          />
        </div>

        <div className={styles.field} style={{ flex: '0 0 120px' }}>
          <label className={styles.label}>{t('chapterOrder')}</label>
          <input
            name="order"
            type="number"
            min={1}
            defaultValue={chapter.order}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t('language_label')}</label>
        <select
          className={styles.statusSelect}
          value={selectedLocale}
          disabled={busy}
          onChange={(e) => handleLocaleChange(e.target.value)}
        >
          {ALL_LOCALES.filter(({ value }) =>
            value === chapter.sourceLocale || novelLocales.includes(value)
          ).map(({ value, label }) => {
            const tr = chapter.translations.find((tr) => tr.locale === value)
            let suffix = ''
            if (tr) {
              suffix = tr.status === 'published' ? '（已发布）' : '（草稿）'
            } else if (value !== chapter.sourceLocale) {
              suffix = '（不存在）'
            }
            return (
              <option key={value} value={value}>
                {label}{suffix}
              </option>
            )
          })}
        </select>
        {!currentTranslation && (
          <p className={styles.localeNote}>此语言版本尚未创建，保存后将新建翻译记录。</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>
          {t('chapterContent')} <span className={styles.required}>*</span>
        </label>
        <textarea
          name="content"
          required
          rows={22}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder={currentTranslation ? t('chapterContentPlaceholder') : '此语言版本尚未创建，请输入内容以新建…'}
          className={styles.textarea}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.footer}>
        <select
          className={styles.statusSelect}
          value={selectedStatus}
          disabled={busy}
          onChange={(e) => setSelectedStatus(e.target.value as 'draft' | 'published')}
        >
          <option value="draft">草稿</option>
          <option value="published">发布</option>
        </select>
        <button
          type="button"
          disabled={busy}
          className={styles.primaryBtn}
          onClick={() => handleSubmit(selectedStatus)}
        >
          {submitting ? '…' : t('saveChanges')}
        </button>
      </div>
    </form>
  )
}
