import { useParams, Link } from 'react-router-dom';
import { findPlayer, fmt } from '../data/index.js';
import { OriginBadge, TierBadge, Flag } from '../components/Badge.jsx';

export default function PlayerDetail() {
  const { role, id } = useParams();
  const p = findPlayer(role, id);
  if (!p) return <div className="container card"><h1>Player not found</h1><Link to="/shortlist">Back to shortlist</Link></div>;
  const m1 = p.model1, m2 = p.model2;
  const gap = m1 && m2 ? Math.abs(m1.rank - m2.rank) : 0;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Link to="/shortlist" className="text-link">← Shortlist</Link>
          <h1>{p.name}</h1>
          <p className="lede">{p.poolRole} · {p.country}</p>
          <div className="chips">
            <span className="chip-solid">Team order {p.teamOrder} of 10 {role === 'batter' ? 'batters' : 'bowlers'}</span>
            <OriginBadge origin={p.origin} />
            <TierBadge tier={m1?.tier} />
            {p.thin && <Flag>Thin sample</Flag>}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid-2">
          <section className="card">
            <h2>Why RR considers this player</h2>
            <dl className="kv">
              <dt>Squad need</dt><dd>{p.need}</dd>
              <dt>Rationale</dt><dd>{p.rationale}</dd>
              <dt>Main caveat</dt><dd>{p.caveat}</dd>
            </dl>
          </section>
          <section className="card">
            <h2>Match data</h2>
            <dl className="kv">
              <dt>Matches in data</dt><dd>{p.matches}</dd>
              <dt>Balls faced</dt><dd>{p.ballsFaced.toLocaleString('en-IN')}</dd>
              <dt>Balls bowled</dt><dd>{p.ballsBowled.toLocaleString('en-IN')}</dd>
            </dl>
          </section>
        </div>

        {p.rated ? (
          <div className="grid-2">
            <section className="card">
              <h2>Model 1 · SupeRR v3</h2>
              <p className="muted">Rank out of 50 reference {role === 'batter' ? 'batters' : 'bowlers'}.</p>
              <p className="big-number">#{m1.rank}</p>
              <dl className="kv">
                <dt>Score</dt><dd>{fmt(m1.score)}</dd>
                <dt>Evidence tier</dt><dd>{m1.tier}</dd>
                <dt>Pressure balls / matches</dt><dd>{m1.pressureBalls} / {m1.pressureMatches}</dd>
                <dt>Consistency</dt><dd>{fmt(m1.consistency, 1)}</dd>
              </dl>
            </section>
            <section className="card">
              <h2>Model 2 · Learned leverage</h2>
              <p className="muted">Rank among eligible players.</p>
              <p className="big-number">#{m2.rank}</p>
              <dl className="kv">
                <dt>Score (gamma)</dt><dd className={m2.gamma < 0 ? 'neg' : ''}>{m2.gamma.toFixed(4)}</dd>
                <dt>Pressure balls / matches</dt><dd>{m2.pressureBalls} / {m2.pressureMatches}</dd>
              </dl>
              {m2.gamma < 0 && <p className="note">Negative score: below expectation on high-pressure balls in this model.</p>}
            </section>
          </div>
        ) : (
          <section className="card caveat">
            <h2>Not model-rated</h2>
            <p>The supplied data has no recorded performance for this player, so no model rank or score is shown. The selection rests on squad need and the squad list only.</p>
          </section>
        )}

        <section className="card caveat">
          <h2>Read this with care</h2>
          <ul>
            {p.thin && <li>Under 20 pressure matches or tier B evidence: treat the score as provisional.</li>}
            {gap > 20 && <li>The two models disagree strongly on this player. Their ranks are not combined.</li>}
            <li>Scores come from IPL and T20I data since 2022. Domestic-only form is less well covered.</li>
            <li>The shortlist is a team decision informed by the models, not a bid recommendation or price estimate.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
