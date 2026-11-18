import raw from './players.json';

export const batters = raw.batters;
export const bowlers = raw.bowlers;
export const meta = raw.meta;

export const byKey = (role, id) =>
  (role === 'batter' ? batters : bowlers).find((p) => String(p.id) === String(id));

export const fmt = (n, d = 3) => (n === null || n === undefined ? '—' : Number(n).toFixed(d));
export const pct = (n) => (n === null || n === undefined ? '—' : `${Math.round(n * 100)}%`);
