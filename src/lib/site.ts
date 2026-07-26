/** Single place for the facts that appear in more than one page. */
export const site = {
  name: 'Felipe Caicedo',
  url: 'https://f15cubing.github.io',
  tagline: 'Colombian mathematician at MIT',
  description:
    'Felipe Caicedo — IMO bronze medallist, MIT mathematics with computer science.',
  /** Contact: email, LinkedIn, GitHub. Deliberately no telephone number. */
  email: 'fcaicedo@mit.edu',
  /*
   * Path to the downloadable CV, or null. Keep it null until the file is
   * actually in public/ — a download link that 404s is worse than no link.
   * To enable: export a phone-free PDF from the Word original, drop it at
   * public/felipe-caicedo-cv.pdf, and set this to '/felipe-caicedo-cv.pdf'.
   */
  cvPdf: null as string | null,
  links: [
    { label: 'Email', href: 'mailto:fcaicedo@mit.edu' },
    { label: 'GitHub', href: 'https://github.com/f15cubing' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/felipecaicedom' },
  ],
} as const;

/** Roman numerals, for proposition markers. Byrne numbered his plates. */
export function roman(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let out = '';
  let rest = n;
  for (const [value, glyph] of table) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}
