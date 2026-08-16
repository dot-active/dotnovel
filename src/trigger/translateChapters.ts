import { task } from '@trigger.dev/sdk/v3'
import { PrismaClient } from '@prisma/client'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { neon, types } from '@neondatabase/serverless'
import { translateChapter } from './translateChapter'

types.setTypeParser(types.builtins.TIMESTAMP, (v: string) => v)
types.setTypeParser(types.builtins.TIMESTAMPTZ, (v: string) => v)
types.setTypeParser(types.builtins.DATE, (v: string) => v)

function createPrisma() {
  const sql = neon(process.env.DATABASE_URL!)
  const adapter = new PrismaNeonHTTP(sql)
  return new PrismaClient({ adapter })
}

// Fans out to translate-chapter for one or many chapters into a single
// target locale, and owns the TranslationRequest lifecycle (pending →
// processing → completed/failed) for that (novelId, targetLocale) pair.
// Triggered from the chapters page — independent of translate-novel, which
// only handles the novel's own title/description.
export const translateChapters = task({
  id: 'translate-chapters',
  maxDuration: 3600,
  run: async (payload: {
    translationRequestId: string
    novelId: string
    sourceLocale: string
    targetLocale: string
    chapterIds: string[]
  }) => {
    const { translationRequestId, novelId, sourceLocale, targetLocale, chapterIds } = payload
    const prisma = createPrisma()

    try {
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: 'processing', totalChapters: chapterIds.length, doneChapters: 0 },
      })

      const results = await translateChapter.batchTriggerAndWait(
        chapterIds.map((chapterId) => ({
          payload: { chapterId, novelId, sourceLocale, targetLocale },
        }))
      )

      const failedCount = results.runs.filter((r) => !r.ok).length

      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: {
          status: failedCount === 0 ? 'completed' : 'failed',
          errorMessage: failedCount > 0 ? `${failedCount}/${chapterIds.length} chapters failed` : null,
        },
      })
    } catch (err) {
      await prisma.translationRequest.update({
        where: { id: translationRequestId },
        data: { status: 'failed', errorMessage: err instanceof Error ? err.message : String(err) },
      })
      throw err
    }
  },
})
