import { useState } from 'react';
import { Link } from 'react-router-dom';
import { batters, bowlers, fmt } from '../data/index.js';
import { OriginBadge, TierBadge, Flag } from '../components/Badge.jsx';

export default function Shortlist() {
  const [tab, setTab] = useState('batter');
  const list = tab === 'batter' ? batters : bowlers;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Shortlist</p>
          <h1>Final 20 players</h1>
          <p className="lede">Listed in the team’s order. Model ranks sit beside it and are never combined with it.</p>
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'batter'} className={tab === 'batter' ? 'on' : ''} onClick={() => setTab('batter')}>Batters (10)</button>
            <button role="tab" aria-selected={tab === 'bowler'} className={tab === 'bowler' ? 'on' : ''} onClick={() => setTab('bowler')}>Bowlers (10)</button>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="card scroll">
          <table className="players">
            <caption className="sr-only">{tab === 'batter' ? 'Batters' : 'Bowlers'} final shortlist</caption>
            <thead>
              <tr>
                <th>#</th><th>Player</th><th>Country</th><th>Origin</th><th>Pool role</th>
                <th className="num">M1 rank</th><th className="num">M1 score</th><th>Tier</th><th className="num">M2 rank</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id}>
                  <td className="num">{p.teamOrder}</td>
                  <td>
                    <Link to={`/player/${tab}/${p.id}`} className="player-link">{p.name}</Link>
                    {p.thin && <Flag>thin</Flag>}
                  </td>
                  <td>{p.country}</td>
                  <td><OriginBadge origin={p.origin} /></td>
                  <td>{p.poolRole}</td>
                  <td className="num">{p.model1 ? `${p.model1.rank} of 50` : '—'}</td>
                  <td className="num">{p.model1 ? fmt(p.model1.score) : '—'}</td>
                  <td><TierBadge tier={p.model1?.tier} /></td>
                  <td className="num">{p.model2 ? p.model2.rank : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted small">
          M1 = Model 1 (SupeRR v3): rank out of 50 reference players. M2 = Model 2: rank among eligible players.
          Thin means under 20 pressure matches or tier B evidence.
        </p>
      </div>
    </>
  );
}
