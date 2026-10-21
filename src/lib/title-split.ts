/**
 * Splits a page title into the lead, set in ink, and the rest, set in grey, the way page heroes
 * read: at the first colon. A title without one is all lead. `rest` keeps its leading space, so
 * the two parts join as written.
 */
export function splitTitle(title: string): { lead: string; rest: string } {
  const colon = title.indexOf(': ')
  return colon > 0 ? { lead: title.slice(0, colon + 1), rest: title.slice(colon + 1) } : { lead: title, rest: '' }
}
