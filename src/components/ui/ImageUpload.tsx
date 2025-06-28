import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  currentImage?: string
  onRemove?: () => void
  accept?: string
  maxSize?: number // in MB
  className?: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
  onRemove,
  accept = "image/*",
  maxSize = 5, // 5MB default
  className = ""
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setError(null)
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    
    onImageSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onRemove?.()
  }

  return (
    <div className={`relative ${className}`}>
      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative group"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-primary-400/20"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
            <button
              onClick={handleRemove}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      ) : (
        <div
          className={`
            w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer
            transition-all duration-300 ${
              dragActive 
                ? 'border-primary-400 bg-primary-400/10' 
                : 'border-gray-600 hover:border-primary-400/50 hover:bg-primary-400/5'
            }
          `}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {dragActive ? (
                <Upload className="text-primary-400" size={48} />
              ) : (
                <ImageIcon className="text-gray-400" size={48} />
              )}
            </div>
            <p className="text-gray-300 mb-2">
              {dragActive ? 'Drop image here' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-gray-500 text-sm">
              PNG, JPG, WEBP up to {maxSize}MB
            </p>
          </div>
        </div>
      )}
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center text-red-400 text-sm"
        >
          <AlertCircle size={16} className="mr-2" />
          {error}
        </motion.div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}

export default ImageUpload 