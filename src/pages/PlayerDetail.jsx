import { useParams, Link } from 'react-router-dom';
import { batters, bowlers, byKey, fmt, pct } from '../data/index.js';
import { StatusBadge, OriginBadge, Flag } from '../components/Badge.jsx';
import Interval from '../components/Interval.jsx';

const pool = (role) => (role === 'batter' ? batters : bowlers);

export default function PlayerDetail() {
  const { role, id } = useParams();
  const p = byKey(role, id);
  if (!p) return <div className="container card"><h1>Player not found</h1><Link to="/shortlist">Back to shortlist</Link></div>;

  const list = pool(role);
  const min = Math.min(...list.map((x) => x.scoreLo));
  const max = Math.max(...list.map((x) => x.scoreHi));
  const shareTotal = p.share.IPL + p.share.T20I + p.share.Other;
  const m1 = p.model1;
  const gap = p.raw.pressure - p.raw.all;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Link to="/shortlist" className="text-link">← Shortlist</Link>
          <h1>{p.name}</h1>
          <p className="lede">
            {p.style} · {p.origin === 'Unknown' ? 'Origin unknown (IPL only)' : p.originLabel} · {p.iplTeam ?? 'No recent IPL team'}
          </p>
          <div className="chips">
            <span className="chip-solid">Rank {p.rank} of 50</span>
            <StatusBadge status={p.status} />
            <OriginBadge origin={p.origin} />
            {p.thin && <Flag>Thin sample: under 100 pressure balls</Flag>}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="grid-2">
          <section className="card">
            <h2>Pressure score</h2>
            <p className="big-number">{fmt(p.score, 3)}</p>
            <p className="muted">Runs above model-expected per high-pressure ball, shrunk toward average. Higher is better.</p>
            <Interval lo={p.scoreLo} hi={p.scoreHi} score={p.score} min={min} max={max} />
            <p className="small">90% range: <strong>{fmt(p.scoreLo, 3)}</strong> to <strong>{fmt(p.scoreHi, 3)}</strong></p>
            <h3>Chance of a top 10 finish</h3>
            <Bar value={p.pTop10} label={pct(p.pTop10)} />
            <p className="small muted">
              Across resamples, rank ranges from {p.bootP05} to {p.bootP95} (median {p.bootMedian}).
              Top 50 probability: {pct(p.pTop50)}.
            </p>
          </section>

          <section className="card">
            <h2>Pressure against usual</h2>
            <dl className="kv">
              <dt>Pressure rate</dt><dd>{fmt(p.raw.pressure, 3)} per ball</dd>
              <dt>Usual rate</dt><dd>{fmt(p.raw.all, 3)} per ball</dd>
              <dt>Difference</dt><dd className={gap >= 0 ? 'pos' : 'neg'}>{gap >= 0 ? '+' : ''}{fmt(gap, 3)}</dd>
              <dt>High-pressure balls</dt><dd>{p.pressureBalls} in {p.pressureMatches} matches</dd>
              <dt>Balls in data</dt><dd>{p.balls.toLocaleString('en-IN')}</dd>
            </dl>
            <h3>Where the pressure balls came from</h3>
            <Stack parts={[
              ['IPL', p.share.IPL], ['T20I', p.share.T20I], ['Other T20', p.share.Other],
            ]} total={shareTotal} />
            <p className="small muted">{p.note}</p>
          </section>
        </div>

        <section className="card">
          <h2>Cross-check: SupeRR v3</h2>
          <p className="muted">A separate model with its own evidence tiers. Its score is shown for comparison only.</p>
          <dl className="kv two">
            <dt>Score</dt><dd>{fmt(m1.score, 2)}</dd>
            <dt>Evidence tier</dt><dd>{m1.tier}</dd>
            <dt>Rank in reference pool</dt><dd>{m1.rankInPool ?? '—'}</dd>
            <dt>Consistency</dt><dd>{fmt(m1.consistency, 1)}</dd>
            <dt>Level</dt><dd>{fmt(m1.level, 1)}</dd>
            <dt>Level on pressure</dt><dd>{fmt(m1.levelHigh, 1)}</dd>
          </dl>
          <Agreement p={p} />
        </section>

        <section className="card caveat">
          <h2>Read this with care</h2>
          <ul>
            {p.thin && <li>Under 100 pressure balls: the score is pulled toward average and the range is wide.</li>}
            <li>Scores come from IPL and T20I data. Opposition and venue effects are adjusted, but not perfectly.</li>
            <li>Shortlist status is a model statement, not a bid recommendation or a price estimate.</li>
            {p.origin === 'Unknown' && <li>Nationality is not in the data. Origin is taken from the IPL record only.</li>}
          </ul>
        </section>
      </div>
    </>
  );
}

function Bar({ value, label }) {
  return (
    <div className="bar" role="img" aria-label={`Top 10 probability ${label}`}>
      <div className="bar-fill" style={{ width: `${Math.round(value * 100)}%` }} />
      <span className="bar-label">{label}</span>
    </div>
  );
}

function Stack({ parts, total }) {
  return (
    <div className="stack">
      {parts.map(([k, v], i) => (
        <div key={k} className={`seg seg-${i}`} style={{ width: `${(v / (total || 1)) * 100}%` }} title={`${k} ${pct(v)}`}>
          {v >= 0.1 ? `${k} ${pct(v)}` : ''}
        </div>
      ))}
    </div>
  );
}

function Agreement({ p }) {
  const m1Top10 = p.model1.rankInPool != null && p.model1.rankInPool <= 10;
  if (p.top10 && m1Top10) return <p className="note ok">Both models place this player in their top 10.</p>;
  if (p.top10) return <p className="note">Top 10 here, but outside the SupeRR v3 top 10. Check the models disagree.</p>;
  if (m1Top10) return <p className="note">Top 10 in SupeRR v3, but outside the top 10 here.</p>;
  return <p className="note">Not in either model’s top 10.</p>;
}
