import { meta } from '../data/index.js';

const steps = [
  ['Define pressure from the match itself', 'A win-probability model is trained for each innings using only the match state before each ball. Balls in the top 20 percent of expected win-probability swing count as high pressure. Out-of-fold log-loss is 0.637 and 0.407 for the two innings, against 0.693 for a constant baseline.'],
  ['Score performance on those balls (Model 2)', 'Runs and wickets are compared with what a context-only model expects. Batters are credited with runs above expectation, and bowlers with runs saved. A hierarchical model separates each player’s overall level from their extra high-pressure effect, and shrinks small samples toward average.'],
  ['Score the same players with SupeRR v3 (Model 1)', 'A separate pressure-performance pipeline ranks players against a reference pool of 50 batters and 50 bowlers. Each player gets an evidence tier: A full, B moderate, C thin.'],
  ['Build the shortlist', 'The team ordered the shortlist using model results and squad need: ten batters and ten bowlers, split evenly between Indian and overseas players. Model ranks sit beside the team order and are never merged.'],
];

export default function Approach() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Approach</p>
          <h1>From ball-by-ball data to a 20-player shortlist</h1>
          <p className="lede">Two models, each measuring a different thing, plus the team’s own judgement on squad need.</p>
        </div>
      </section>
      <div className="container">
        <ol className="steps">
          {steps.map(([t, b], i) => (
            <li key={t} className="step card">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <div><h2>{t}</h2><p>{b}</p></div>
            </li>
          ))}
        </ol>
        <section className="card">
          <h2>Model definitions</h2>
          <p><strong>Model 1:</strong> {meta.model1}</p>
          <p><strong>Model 2:</strong> {meta.model2}</p>
          <p className="muted">{meta.note}</p>
        </section>
        <section className="card">
          <h2>Eligibility</h2>
          <p>Model 2 requires at least 300 balls, 20 matches and 50 high-pressure balls. Players below these thresholds are not ranked. The player pool has {meta.poolSize} eligible players.</p>
        </section>
      </div>
    </>
  );
}
