// ============================================================
// Tags Adapter — Parsea y comprime tags (string ↔ string[])
// ============================================================

/**
 * Parsea tags desde string (comma-separated) o array
 * Normaliza: lowercase, trim, deduplica
 * Input: "React, TypeScript, react" | ["React", "typescript"]
 * Output: ["react", "typescript"]
 */
export function parseTags(input: string | string[]): string[] {
  let tags: string[]

  if (Array.isArray(input)) {
    tags = input
  } else {
    tags = input.split(',')
  }

  return tags
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0)
    .filter((tag, index, arr) => arr.indexOf(tag) === index) // deduplicate
}

/**
 * Comprime array de tags a string comma-separated
 * Input: ["react", "typescript"]
 * Output: "react, typescript"
 */
export function compressTags(tags: string[]): string {
  return tags.join(', ')
}
