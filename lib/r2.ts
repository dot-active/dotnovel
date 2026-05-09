import { S3Client } from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export const R2_BUCKET = process.env.R2_BUCKET_NAME!

// r2.dev is a public CDN subdomain — bucket name is already encoded in the
// subdomain, so the path is just the object key with no bucket prefix.
export function r2PublicUrl(key: string) {
  return `${process.env.R2_PUBLIC_URL}/${key}`
}
