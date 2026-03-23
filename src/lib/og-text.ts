/** Trim and ellipsize for OG overlay (Satori has no automatic wrap for long strings). */
export function clipOgText(s: string | undefined | null, maxChars: number): string {
  if (!s) return ''
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= maxChars) return t
  return `${t.slice(0, maxChars - 1).trimEnd()}…`
}
