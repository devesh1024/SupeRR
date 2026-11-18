const LABEL = { secure: 'Secure top 10', contender: 'Contender', unlikely: 'Outside top 10' };

export function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{LABEL[status] ?? status}</span>;
}

export function OriginBadge({ origin }) {
  return <span className={`badge badge-origin-${origin.toLowerCase()}`}>{origin}</span>;
}

export function Flag({ children }) {
  return <span className="flag">{children}</span>;
}
