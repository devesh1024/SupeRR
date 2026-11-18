import { Link } from 'react-router-dom';
import { batters, bowlers, meta, fmt } from '../data/index.js';
import { StatusBadge, OriginBadge } from '../components/Badge.jsx';

function Top10({ title, list, role }) {
  const top = list.filter((p) => p.top10);
  return (
    <section className="card">
      <div className="card-head">
        <h2>{title}</h2>
        <Link to="/shortlist" className="text-link">All 50 →</Link>
      </div>
      <ol className="top-list">
        {top.map((p) => (
          <li key={p.id}>
            <Link to={`/player/${role}/${p.id}`} className="top-row">
              <span className="rank-num">{p.rank}</span>
              <span className="top-name">{p.name}</span>
              <OriginBadge origin={p.origin} />
              <span className="top-score">{fmt(p.score, 3)}</span>
              <span className="top-prob">{Math.round(p.pTop10 * 100)}%</span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="muted small">Columns: rank, player, origin, pressure score, probability of staying in the top 10 across resamples.</p>
    </section>
  );
}

export default function Home() {
  const secureB = batters.filter((p) => p.status === 'secure').length;
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">RR IPL 2027 auction · Pressure performance</p>
          <h1>Who performs when the match is on the line?</h1>
          <p className="lede">
            We score every batter and bowler on ball-by-ball performance in high-pressure moments, then
            show how confident each ranking is. This site gives the shortlist of 50 batters and 50 bowlers,
            the top 10 in each, and the full evidence behind every player.
          </p>
          <div className="stats">
            <Stat value={meta.matchesRated} label="matches rated" />
            <Stat value={meta.ballsRated.toLocaleString('en-IN')} label="deliveries" />
            <Stat value="50 + 50" label="shortlisted" />
            <Stat value={secureB} label="batters secure in top 10" />
          </div>
        </div>
      </section>

      <div className="container">
        <section className="answer card">
          <h2>The answer in one paragraph</h2>
          <p>
            Ranking is by runs above model-expected per ball on high-pressure balls, with weaker samples pulled
            toward average. Two independent models were built. They agree moderately (rank correlation
            {' '}{meta.agreement.batters.toFixed(2)} for batters and {meta.agreement.bowlers.toFixed(2)} for bowlers), so the
            top 10 lists are best read as strong candidates, not guaranteed picks. Each player page shows the
            uncertainty and the points of disagreement.
          </p>
        </section>

        <div className="grid-2">
          <Top10 title="Top 10 batters" list={batters} role="batter" />
          <Top10 title="Top 10 bowlers" list={bowlers} role="bowler" />
        </div>
      </div>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
