export function OriginBadge({ origin }) {
  return <span className={`badge badge-origin-${origin.toLowerCase()}`}>{origin}</span>;
}

export function TierBadge({ tier }) {
  if (!tier) return <span className="badge badge-none">Not model-rated</span>;
  const label = { A: 'Tier A · full evidence', B: 'Tier B · moderate', C: 'Tier C · thin' }[tier];
  return <span className={`badge badge-tier-${tier.toLowerCase()}`}>{label}</span>;
}

export function Flag({ children }) {
  return <span className="flag">{children}</span>;
}
