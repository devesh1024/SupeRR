import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { batters, bowlers, fmt } from '../data/index.js';
import { StatusBadge, OriginBadge, Flag } from '../components/Badge.jsx';
import Interval from '../components/Interval.jsx';

export default function Shortlist() {
  const [tab, setTab] = useState('batter');
  const [q, setQ] = useState('');
  const [origin, setOrigin] = useState('All');
  const [topOnly, setTopOnly] = useState(false);

  const all = tab === 'batter' ? batters : bowlers;
  const min = Math.min(...all.map((p) => p.scoreLo));
  const max = Math.max(...all.map((p) => p.scoreHi));

  const rows = useMemo(
    () =>
      all.filter(
        (p) =>
          (origin === 'All' || p.origin === origin) &&
          (!topOnly || p.top10) &&
          p.name.toLowerCase().includes(q.trim().toLowerCase())
      ),
    [all, origin, topOnly, q]
  );

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Shortlist</p>
          <h1>50 batters and 50 bowlers</h1>
          <p className="lede">Ranked by pressure score. The top 10 in each group are marked. Select a name for full evidence.</p>
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'batter'} className={tab === 'batter' ? 'on' : ''} onClick={() => setTab('batter')}>Batters</button>
            <button role="tab" aria-selected={tab === 'bowler'} className={tab === 'bowler' ? 'on' : ''} onClick={() => setTab('bowler')}>Bowlers</button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="toolbar card">
          <input type="search" placeholder="Search player" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search player" />
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} aria-label="Origin">
            <option>All</option>
            <option>Indian</option>
            <option>Overseas</option>
            <option>Unknown</option>
          </select>
          <label className="check">
            <input type="checkbox" checked={topOnly} onChange={(e) => setTopOnly(e.target.checked)} /> Top 10 only
          </label>
          <span className="muted small">{rows.length} of {all.length}</span>
        </div>

        <div className="card scroll">
          <table className="players">
            <caption className="sr-only">{tab === 'batter' ? 'Batters' : 'Bowlers'} shortlist</caption>
            <thead>
              <tr>
                <th>#</th><th>Player</th><th>Origin</th><th>{tab === 'batter' ? 'Role' : 'Phase'}</th>
                <th className="num">Score</th><th>90% range</th><th className="num">P(top 10)</th>
                <th>Status</th><th>SupeRR v3</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className={p.top10 ? 'is-top' : ''}>
                  <td className="num">{p.rank}</td>
                  <td>
                    <Link to={`/player/${tab}/${p.id}`} className="player-link">{p.name}</Link>
                    {p.thin && <Flag>thin sample</Flag>}
                  </td>
                  <td><OriginBadge origin={p.origin} /></td>
                  <td>{p.style ?? '—'}</td>
                  <td className="num">{fmt(p.score, 3)}</td>
                  <td className="range"><Interval lo={p.scoreLo} hi={p.scoreHi} score={p.score} min={min} max={max} /></td>
                  <td className="num">{Math.round(p.pTop10 * 100)}%</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td className="num">{p.model1.rankInPool ?? '—'} <span className="muted small">{p.model1.tier}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          SupeRR v3 column: rank within the reference pool of that model, with its evidence tier (A full, B moderate, C thin).
          The two models are separate and are not combined.
        </p>
      </div>
    </>
  );
}
