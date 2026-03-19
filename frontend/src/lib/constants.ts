// ============================================================
// Constants
// ============================================================

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export const SITE_NAME = 'Blog Técnico'
export const SITE_DESCRIPTION = 'Artículos sobre tecnología, desarrollo web y más'

// Paths
export const PATHS = {
  HOME: '/',
  BLOG: (slug: string) => `/blog/${slug}`,
  ADMIN: {
    BASE: '/admin',
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    EDITOR: '/admin/editor',
    EDITOR_ID: (id: string) => `/admin/editor/${id}`,
  },
} as const

// UI Constants
export const POSTS_PER_PAGE = 10
export const TOAST_DURATION_MS = 4000
