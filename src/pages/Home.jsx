import { Link } from 'react-router-dom';
import { batters, bowlers, meta } from '../data/index.js';
import { OriginBadge } from '../components/Badge.jsx';

function Column({ title, list, role }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>{title}</h2>
        <Link to="/shortlist" className="text-link">Full detail →</Link>
      </div>
      <ol className="order-list">
        {list.map((p) => (
          <li key={p.id}>
            <Link to={`/player/${role}/${p.id}`} className="order-row">
              <span className="order-num">{p.teamOrder}</span>
              <span className="order-name">{p.name}</span>
              <OriginBadge origin={p.origin} />
              <span className="order-model">{p.model1 ? `M1 #${p.model1.rank}` : 'Not model-rated'}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Rajasthan Royals · IPL 2027 auction</p>
          <h1>Final 20-player shortlist, with the evidence behind each name.</h1>
          <p className="lede">
            Ten batters and ten bowlers, split evenly between Indian and overseas players. Each name links to its model
            results and the caveats that apply to it.
          </p>
          <div className="stats">
            <Stat value={meta.shortlist} label="players shortlisted" />
            <Stat value={`${meta.batters} + ${meta.bowlers}`} label="batters and bowlers" />
            <Stat value={`${meta.indian} / ${meta.overseas}`} label="Indian / overseas" />
            <Stat value={meta.modelRated} label="model-rated" />
          </div>
        </div>
      </section>

      <div className="container">
        <section className="card answer">
          <h2>How to read this</h2>
          <p>
            The order within each group is the team’s order. Model ranks sit beside it and are never merged into it.
            Model 1 ranks each player among 50 batters or 50 bowlers in the reference pool. Model 2 ranks eligible players.
            Three players have no model rating, because the supplied data has no recorded performance for them. They are
            included on squad need and are marked as such.
          </p>
        </section>
        <div className="grid-2">
          <Column title="Batters" list={batters} role="batter" />
          <Column title="Bowlers" list={bowlers} role="bowler" />
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
