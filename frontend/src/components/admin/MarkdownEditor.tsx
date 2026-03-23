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
              'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-white/[0.06] text-white'
                : 'text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300'
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
          placeholder={placeholder ?? 'Write your post in Markdown...'}
          rows={20}
          className="font-mono text-sm"
        />
      ) : (
        <div className="min-h-[400px] rounded-lg border border-white/[0.06] bg-white/[0.02] p-6">
          {value.trim() ? (
            <PostContent content={value} />
          ) : (
            <p className="text-zinc-600">
              Nothing to preview yet...
            </p>
          )}
        </div>
      )}
    </div>
  )
}
