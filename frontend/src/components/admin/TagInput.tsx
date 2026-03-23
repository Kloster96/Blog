'use client'

// ============================================================
// Tag Input Component
// ============================================================

import { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { parseTags } from '@/adapters/tags.adapter'
import { cn } from '@/lib/utils'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addTags = (rawInput: string) => {
    const newTags = parseTags(rawInput)
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
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 transition-colors focus-within:border-white/[0.16]">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1 text-sm font-medium text-zinc-300"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-sm hover:bg-white/[0.08]"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => inputValue.trim() && addTags(inputValue)}
          placeholder={value.length === 0 ? placeholder ?? 'Add tags...' : ''}
          className={cn(
            'min-w-[120px] flex-1 border-0 bg-transparent p-1 text-sm outline-none text-zinc-100',
            'placeholder:text-zinc-600'
          )}
        />
      </div>
      <p className="mt-1.5 text-xs text-zinc-600">
        Press Enter or comma to add tags
      </p>
    </div>
  )
}
