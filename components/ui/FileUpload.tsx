'use client'

import { useState, useRef } from 'react'
import { Upload, X, Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FileUploadProps {
  onUpload: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>
  accept?: string
  maxSize?: number // in MB
  label?: string
  helperText?: string
  currentFile?: string | null
  onRemove?: () => void
  className?: string
}

export function FileUpload({
  onUpload,
  accept = 'image/*',
  maxSize = 5,
  label,
  helperText,
  currentFile,
  onRemove,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentFile || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file: File) => {
    setError(null)
    setUploadSuccess(false)

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    // Show preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    // Upload file
    setIsUploading(true)
    try {
      const result = await onUpload(file)

      if (result.success) {
        setUploadSuccess(true)
        if (result.url) {
          setPreview(result.url)
        }
        setTimeout(() => setUploadSuccess(false), 3000)
      } else {
        setError(result.error || 'Upload failed')
        setPreview(null)
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed')
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setUploadSuccess(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onRemove?.()
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block mb-2 text-sm font-regular text-light-text">{label}</label>
      )}

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative border-3 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-lime-green bg-lime-green/5'
            : 'border-gray-700 hover:border-lime-green hover:bg-lime-green/5',
          preview && 'border-solid'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          // Preview State
          <div className="relative">
            {preview.startsWith('data:image') || preview.startsWith('http') ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg object-cover"
              />
            ) : (
              <div className="text-gray-400">File uploaded</div>
            )}

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Success Indicator */}
            {uploadSuccess && (
              <div className="absolute top-2 left-2 flex items-center gap-2 bg-lime-green text-dark-text px-3 py-1 rounded-full text-xs font-mono font-bold">
                <Check className="h-3 w-3" />
                Uploaded
              </div>
            )}
          </div>
        ) : (
          // Upload State
          <div className="flex flex-col items-center gap-3">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-lime-green animate-spin" />
                <p className="text-sm font-mono text-gray-400">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-gray-600" />
                <div>
                  <p className="text-sm font-mono text-white mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {accept === 'image/*' ? 'PNG, JPG, WEBP' : accept} (max {maxSize}MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-500 font-mono">{helperText}</p>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
