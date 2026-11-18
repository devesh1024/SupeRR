// Horizontal 90% interval with point estimate. Scale is shared across the list for comparability.
export default function Interval({ lo, hi, score, min, max }) {
  const x = (v) => ((v - min) / (max - min)) * 100;
  return (
    <svg className="interval" viewBox="0 0 100 14" preserveAspectRatio="none" role="img"
      aria-label={`Score ${score.toFixed(3)}, 90% interval ${lo.toFixed(3)} to ${hi.toFixed(3)}`}>
      <line x1="0" y1="7" x2="100" y2="7" className="interval-track" />
      <line x1={x(lo)} y1="7" x2={x(hi)} y2="7" className="interval-range" />
      <circle cx={x(score)} cy="7" r="3.2" className="interval-point" />
    </svg>
  );
}
