/**
 * Splits a page title into the lead, set in ink, and the rest, set in grey, the way page heroes
 * read. The split is at the first colon; with no colon, at the accent phrase from Sanity. A title
 * with neither is all lead. `rest` keeps its leading space, so the two parts join as written.
 */
export function splitTitle(title: string, accent?: string): { lead: string; rest: string } {
  const colon = title.indexOf(': ')
  if (colon > 0) return { lead: title.slice(0, colon + 1), rest: title.slice(colon + 1) }
  const at = accent ? title.indexOf(accent) : -1
  if (at > 0) return { lead: title.slice(0, at).trimEnd(), rest: ` ${title.slice(at)}` }
  return { lead: title, rest: '' }
}
