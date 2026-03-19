'use client'

// ============================================================
// Markdown Editor Component — Write / Preview toggle
// ============================================================

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/Textarea'
import { PostContent } from '@/components/blog/PostContent'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

type Tab = 'write' | 'preview'

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<Tab>('write')

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div className="mb-2 flex gap-1">
        {(['write', 'preview'] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              activeTab === tab
                ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
            )}
          >
            {tab === 'write' ? 'Write' : 'Preview'}
          </button>
        ))}
      </div>

      {/* Editor or Preview */}
      {activeTab === 'write' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? 'Escribí tu post en Markdown...'}
          rows={20}
          className="font-mono text-sm"
        />
      ) : (
        <div className="min-h-[400px] rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          {value.trim() ? (
            <PostContent content={value} />
          ) : (
            <p className="text-gray-400 dark:text-gray-500">
              Nada para previewear todavía...
            </p>
          )}
        </div>
      )}
    </div>
  )
}
