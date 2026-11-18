import { meta } from '../data/index.js';

const files = [
  ['approach_B_shortlist_batters_extended.csv', 'Batter shortlist, 50 rows, with intervals and flags'],
  ['approach_B_shortlist_bowlers_extended.csv', 'Bowler shortlist, 50 rows, with intervals and flags'],
  ['rankings_batters_all.csv', 'SupeRR v3 full batter rankings (cross-check)'],
  ['rankings_bowlers_all.csv', 'SupeRR v3 full bowler rankings (cross-check)'],
];

export default function Evidence() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Evidence</p>
          <h1>What this does not tell you</h1>
          <p className="lede">Read these limits before using any rank as a decision.</p>
        </div>
      </section>
      <div className="container">
        <section className="card caveat">
          <h2>Limits</h2>
          <ul>
            <li>Scores are based on IPL and T20I data from 2022 onward. Domestic-only players have less evidence, and their ranges are wider.</li>
            <li>Pressure is defined from the match state, not from what a team says mattered. A different definition could change the order.</li>
            <li>The two models agree only moderately. Ranks should be read as strong candidates, not certainties.</li>
            <li>{meta.eligibleBatters} batters and {meta.eligibleBowlers} bowlers meet the eligibility filters. Others are excluded, not ranked lower.</li>
            <li>No auction price, purse or valuation is estimated here.</li>
          </ul>
        </section>

        <section className="card">
          <h2>Downloads</h2>
          <p className="muted">Files are the same outputs the models produced.</p>
          <ul className="downloads">
            {files.map(([f, d]) => (
              <li key={f}>
                <a href={`./data/${f}`} download>{f}</a>
                <span className="muted small"> {d}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
