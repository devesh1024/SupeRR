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
            <li>Thin samples: Muhammad Waseem is tier B with 10 pressure matches. Keshav Maharaj (16), Umran Malik (17) and Gareth Delany (19) are below 20 pressure matches. Their scores are provisional.</li>
            <li>Disagreement between models: Brian Bennett is 1st in Model 1 but 110th in Model 2. Avesh Khan, Umran Malik and Jaydev Unadkat have negative Model 2 scores.</li>
            <li>No model rating: Anmolpreet Singh, Ashwin Hebbar and Jhatavedh Subramanyan. Their inclusion rests on squad need only.</li>
            <li>Eligibility to confirm: Bangladesh eligibility for Liton Das and Nasum Ahmed is unresolved.</li>
            <li>The pressure definition comes from match state. A different definition could change some positions.</li>
            <li>No auction price, purse or valuation is estimated here.</li>
          </ul>
        </section>
        <section className="card">
          <h2>Downloads</h2>
          <p className="muted">The final 20 evidence file used for this shortlist.</p>
          <ul className="downloads">
            <li><a href="https://github.com/devesh1024/SupeRR/blob/main/public/data/final20_evidence_check.csv" download>final20_evidence_check.csv</a> <span className="muted small">Model ranks, scores and pressure counts for the 20 players</span></li>
          </ul>
        </section>
      </div>
    </>
  );
}
