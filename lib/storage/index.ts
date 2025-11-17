import { createClient } from '@/lib/supabase/client'

export type StorageBucket = 'avatars' | 'documents'

export interface UploadOptions {
  bucket: StorageBucket
  file: File
  userId: string
  path?: string
  onProgress?: (progress: number) => void
}

export interface UploadResult {
  success: boolean
  url?: string
  path?: string
  error?: string
}

/**
 * Upload a file to Supabase Storage
 * Files are organized by user ID: {bucket}/{userId}/{filename}
 */
export async function uploadFile({
  bucket,
  file,
  userId,
  path,
  onProgress,
}: UploadOptions): Promise<UploadResult> {
  try {
    const supabase = createClient()

    // Generate file path: userId/filename or custom path
    const fileName = path || `${userId}/${Date.now()}-${file.name}`

    // Upload file
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: '3600',
      upsert: true, // Replace if exists
    })

    if (error) {
      console.error('[uploadFile] Error:', error)
      return { success: false, error: error.message }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return {
      success: true,
      url: publicUrl,
      path: data.path,
    }
  } catch (error: any) {
    console.error('[uploadFile] Unexpected error:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: StorageBucket, path: string): Promise<boolean> {
  try {
    const supabase = createClient()

    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      console.error('[deleteFile] Error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[deleteFile] Unexpected error:', error)
    return false
  }
}

/**
 * Get public URL for a file (for public buckets like avatars)
 */
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient()
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path)
  return publicUrl
}

/**
 * Get signed URL for a file (for private buckets like documents)
 */
export async function getSignedUrl(
  bucket: StorageBucket,
  path: string,
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn)

    if (error) {
      console.error('[getSignedUrl] Error:', error)
      return null
    }

    return data.signedUrl
  } catch (error) {
    console.error('[getSignedUrl] Unexpected error:', error)
    return null
  }
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
  } = {}
): { valid: boolean; error?: string } {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
    }
  }

  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    }
  }

  return { valid: true }
}

/**
 * Preset configurations for different file types
 */
export const FILE_CONFIGS = {
  avatar: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    bucket: 'avatars' as StorageBucket,
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
    bucket: 'documents' as StorageBucket,
  },
}
