'use client'

// ============================================================
// Tag Input Component
// ============================================================

import { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { parseTags, compressTags } from '@/adapters/tags.adapter'
import { cn } from '@/lib/utils'

interface TagInputProps {
  value: string[] // Array de tags
  onChange: (tags: string[]) => void
  placeholder?: string
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addTags = (rawInput: string) => {
    const newTags = parseTags(rawInput)
    // Merge con tags existentes (dedupe)
    const merged = [...new Set([...value, ...newTags])]
    onChange(merged)
    setInputValue('')
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputValue.trim()) {
        addTags(inputValue)
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Eliminar último tag con backspace
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-lg border border-gray-300 bg-white p-2 transition-colors focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-800">
        {/* Tags */}
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-brand-100 px-2 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900 dark:text-brand-300"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-sm hover:bg-brand-200 dark:hover:bg-brand-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => inputValue.trim() && addTags(inputValue)}
          placeholder={value.length === 0 ? placeholder ?? 'Agregar tags...' : ''}
          className={cn(
            'min-w-[120px] flex-1 border-0 bg-transparent p-1 text-sm outline-none',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500'
          )}
        />
      </div>
      <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
        Presioná Enter o usá coma para agregar tags
      </p>
    </div>
  )
}
