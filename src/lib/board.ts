/**
 * Minimal FEN → board model. No chess library: we only ever need to draw a
 * static final position, which is the piece-placement field of a FEN and
 * nothing else. Move generation, legality, and check detection are all
 * irrelevant here, so importing an engine would be dead weight.
 */

export type PieceColour = 'white' | 'black';

export interface Square {
  /** Algebraic name, e.g. 'e4'. */
  name: string;
  /** File index 0–7, a–h. */
  file: number;
  /** Rank index 0–7, where 0 is rank 8 (top of a white-orientated board). */
  rank: number;
  piece?: { letter: string; colour: PieceColour };
  /** True for the darker of the two square colours. */
  dark: boolean;
}

const FILES = 'abcdefgh';

/**
 * Parses the placement field of a FEN into 64 squares, reading order top-left
 * to bottom-right for a board seen from white's side.
 *
 * Returns null on anything malformed, so a bad or missing FEN degrades to "no
 * board" rather than throwing during the build.
 */
export function parseFen(fen: string | undefined | null): Square[] | null {
  if (!fen) return null;

  const placement = fen.trim().split(/\s+/)[0];
  if (!placement) return null;

  const rows = placement.split('/');
  if (rows.length !== 8) return null;

  const squares: Square[] = [];

  for (let rank = 0; rank < 8; rank++) {
    let file = 0;
    for (const ch of rows[rank]!) {
      if (/[1-8]/.test(ch)) {
        const skip = Number(ch);
        for (let i = 0; i < skip; i++) {
          if (file > 7) return null;
          squares.push(makeSquare(file, rank));
          file++;
        }
        continue;
      }

      if (!/[prnbqkPRNBQK]/.test(ch)) return null;
      if (file > 7) return null;

      squares.push({
        ...makeSquare(file, rank),
        piece: {
          letter: ch.toLowerCase(),
          colour: ch === ch.toUpperCase() ? 'white' : 'black',
        },
      });
      file++;
    }
    if (file !== 8) return null;
  }

  return squares.length === 64 ? squares : null;
}

function makeSquare(file: number, rank: number): Square {
  return {
    name: `${FILES[file]}${8 - rank}`,
    file,
    rank,
    // a1 is dark; a1 is file 0, rank 7.
    dark: (file + rank) % 2 === 1,
    };
}

/**
 * Piece paths, drawn rather than set as text. Unicode chess glyphs would be
 * simpler but they render differently on every platform and there is no
 * reliable web font for them at this weight, so the board would be the one
 * inconsistent element on the site. These are simple silhouettes on a 0–100
 * square, deliberately flat to sit beside Byrne's figures.
 */
export const PIECE_PATHS: Record<string, string> = {
  p: 'M50 24a11 11 0 0 1 6.5 19.9c5 3.6 7.6 9.4 8.4 17.1h-29.8c.8-7.7 3.4-13.5 8.4-17.1A11 11 0 0 1 50 24Zm-19 42h38c1.5 6.5 3.8 10.5 7 12v3H24v-3c3.2-1.5 5.5-5.5 7-12Z',
  r: 'M27 26h9v7h9v-7h10v7h9v-7h9v16l-5 5c1.5 9 1.5 17 0 25l5 6v7H27v-7l5-6c-1.5-8-1.5-16 0-25l-5-5V26Z',
  n: 'M38 24c3 0 5 1.5 6 4.5 6-1 11 1 15 6 5 6.5 7.5 15 7.5 25.5 0 8 1.5 13.5 4.5 16.5v4.5H29v-4.5c0-7 2.5-13 7.5-18 3-3 4.5-5.5 4.5-7.5 0-1.5-1-2.5-3-3l-6 6-5-5 6-9c-2-2-3-4.5-3-7.5 0-5.5 2.5-8.5 7.5-9Z',
  b: 'M50 22a8 8 0 0 1 5 14.2c5 4 8 10.5 8 19.3 0 6.5-2 11.5-6 15h-14c-4-3.5-6-8.5-6-15 0-8.8 3-15.3 8-19.3A8 8 0 0 1 50 22Zm-19 52h38c1.5 4.5 3.8 7.5 7 9v4H24v-4c3.2-1.5 5.5-4.5 7-9Z',
  q: 'M22 34a5 5 0 1 1 4.6 5l6.4 14 3-20a5 5 0 1 1 6 0l4 20 4-20a5 5 0 1 1 6 0l3 20 6.4-14a5 5 0 1 1 4.6-5l-8 36H30l-8-36Zm8 40h40c1.5 5 3.8 8.5 7 10v4H23v-4c3.2-1.5 5.5-5 7-10Z',
  k: 'M47 18h6v7h7v6h-7v6c8 2.5 13 9 13 18 0 6-2 11-6 14.5H40C36 66 34 61 34 55c0-9 5-15.5 13-18v-6h-7v-6h7v-7Zm-17 56h40c1.5 5 3.8 8.5 7 10v4H23v-4c3.2-1.5 5.5-5 7-10Z',
};
