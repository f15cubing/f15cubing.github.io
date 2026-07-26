#!/usr/bin/env node
/*
 * Picks a game to feature on the chess project page and caches it to
 * src/data/lichess-game.json.
 *
 * Run by .github/workflows/refresh-lichess.yml on a daily schedule, which
 * commits the result if it changed. The site build reads the cached JSON and
 * never talks to Lichess, so a rate-limited or down API can slow the *refresh*
 * but can never fail a deploy.
 *
 * Selection: the highest-rated win from the most recent day the bot won. If it
 * hasn't won in the fetched window, keep whatever is already cached rather than
 * blanking the page.
 *
 *   node scripts/fetch-lichess.mjs
 */

import { writeFile, readFile } from 'node:fs/promises';

const USER = 'felipe_bot_53';
const OUT = new URL('../src/data/lichess-game.json', import.meta.url);
const UA = 'f15cubing.github.io (personal site; contact fcaicedo@mit.edu)';

// Lichess permits one games-export request at a time and answers 429 otherwise.
const ATTEMPTS = 6;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchGames() {
  const url =
    `https://lichess.org/api/games/user/${USER}` +
    '?max=200&rated=true&moves=false&lastFen=true';

  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const res = await fetch(url, {
      headers: { Accept: 'application/x-ndjson', 'User-Agent': UA },
    });

    if (res.ok) {
      const text = await res.text();
      if (!text.startsWith('{"error"')) return text;
    }

    const wait = attempt * 15_000;
    console.warn(
      `attempt ${attempt}/${ATTEMPTS} failed (HTTP ${res.status}); waiting ${wait / 1000}s`,
    );
    if (attempt < ATTEMPTS) await sleep(wait);
  }

  throw new Error(`Lichess did not answer after ${ATTEMPTS} attempts`);
}

function parse(ndjson) {
  return ndjson
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => JSON.parse(l));
}

/** Reshape a raw game into just what the page renders. */
function summarise(game) {
  const white = game.players?.white ?? {};
  const black = game.players?.black ?? {};
  const botIsWhite = white.user?.name?.toLowerCase() === USER;

  const me = botIsWhite ? white : black;
  const them = botIsWhite ? black : white;

  return {
    id: game.id,
    url: `https://lichess.org/${game.id}`,
    colour: botIsWhite ? 'white' : 'black',
    won: game.winner === (botIsWhite ? 'white' : 'black'),
    myRating: me.rating ?? null,
    opponent: them.user?.name ?? 'Anonymous',
    opponentRating: them.rating ?? null,
    /** 'BOT' when the opponent is also a bot. Shown, not hidden. */
    opponentTitle: them.user?.title ?? null,
    speed: game.speed ?? null,
    status: game.status ?? null,
    playedAt: game.createdAt ? new Date(game.createdAt).toISOString() : null,
    lastFen: game.lastFen ?? null,
  };
}

function pick(games) {
  const wins = games
    .map(summarise)
    .filter((g) => g.won && g.lastFen && g.playedAt && g.opponentRating);

  if (wins.length === 0) return null;

  // Most recent day on which it won, then the strongest opponent beaten that day.
  const day = (iso) => iso.slice(0, 10);
  const latestDay = wins.map((g) => day(g.playedAt)).sort().at(-1);

  const sameDay = wins.filter((g) => day(g.playedAt) === latestDay);
  sameDay.sort((a, b) => b.opponentRating - a.opponentRating);

  return sameDay[0];
}

async function main() {
  const games = parse(await fetchGames());
  console.log(`fetched ${games.length} rated games`);

  const chosen = pick(games);

  if (!chosen) {
    console.warn('no win with a final position in the window; keeping the cache');
    return;
  }

  let previous = null;
  try {
    previous = JSON.parse(await readFile(OUT, 'utf8'));
  } catch {
    // No cache yet; that's expected on first run.
  }

  if (previous?.game?.id === chosen.id) {
    console.log(`unchanged (${chosen.id})`);
    return;
  }

  await writeFile(
    OUT,
    JSON.stringify({ fetchedAt: new Date().toISOString(), game: chosen }, null, 2) + '\n',
  );
  console.log(
    `wrote ${chosen.id}: beat ${chosen.opponent} (${chosen.opponentRating}) as ${chosen.colour}`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
