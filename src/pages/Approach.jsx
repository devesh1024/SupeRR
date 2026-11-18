import { meta } from '../data/index.js';

const steps = [
  {
    t: 'Define pressure from the match itself',
    b: 'A gradient-boosted win-probability model is trained for each innings using only the state before each ball (score, wickets, overs left, target). A ball is "high pressure" when its expected swing in win probability is in the top 20%. This is measured from the match, not chosen by hand.',
  },
  {
    t: 'Measure performance against expectation',
    b: 'For each ball we compare the runs (and wickets, costed in runs) against what a context-only model expects. Batters get credit for runs above expectation. Bowlers get credit for runs saved and wickets taken. Run-outs, wides and byes are assigned to the right role.',
  },
  {
    t: 'Shrink small samples toward average',
    b: 'A hierarchical mixed model separates each player’s overall level from their extra high-pressure effect. Players with few pressure balls are pulled toward the average, so a lucky short streak cannot rank above a proven record.',
  },
  {
    t: 'Rank with uncertainty, not just a point',
    b: 'Matches are resampled many times. Each player gets a 90% range for their score and a probability of finishing in the top 10. A "secure" label needs a high probability; a "contender" sits near the cut-off.',
  },
  {
    t: 'Cross-check with a second model',
    b: 'SupeRR v3, a separate pressure-performance pipeline with its own tiers, is applied to the same players. Where the two disagree strongly, the player page says so. Ranks from the two models are shown side by side and never averaged.',
  },
];

export default function Approach() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Approach</p>
          <h1>From ball-by-ball data to a shortlist</h1>
          <p className="lede">
            Built on {meta.matchesRated} matches and {meta.ballsRated.toLocaleString('en-IN')} deliveries (IPL and
            T20I, 2022 onward). Eligibility requires at least 300 balls, 20 matches and 50 high-pressure balls.
            {' '}{meta.eligibleBatters} batters and {meta.eligibleBowlers} bowlers pass these filters.
          </p>
        </div>
      </section>
      <div className="container">
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.t} className="step card">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2>{s.t}</h2>
                <p>{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
        <section className="card">
          <h2>Definition used throughout</h2>
          <p>{meta.pressureDef}</p>
          <p className="muted">{meta.interpretNote}</p>
        </section>
      </div>
    </>
  );
}
