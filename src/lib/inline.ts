/**
 * Minimal inline formatter for CV bullet text: `**bold**` and `*italic*`.
 *
 * Deliberately not a Markdown parser. The CV is plain sentences with the
 * occasional lead-in phrase in bold, and pulling in a parser for that would
 * cost more than it returns. HTML is escaped first, so the data file cannot
 * inject markup by accident.
 */
export function inline(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}
