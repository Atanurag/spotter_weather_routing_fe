import { ShieldCheck } from 'lucide-react';
import { riskColors } from '../utils/riskColors';
import { formatMiles } from '../utils/formatters';

function RiskPill({ risk }) {
  const color = riskColors[risk] || riskColors.Unavailable;
  return <span className="risk-pill" style={{ color, background: `${color}18`, borderColor: `${color}50` }}>{risk}</span>;
}

export default function RiskBreakdown({ routes, currentRoute }) {
  return (
    <aside className="detail-panel">
      <div className="panel-heading"><div><span className="step">03</span><h3>Risk breakdown</h3></div></div>
      <div className="risk-summary"><div className="risk-summary-icon"><ShieldCheck size={22} /></div><div><span>Selected route</span><strong>{currentRoute?.name || '—'}</strong></div><span className="rank-badge">#{currentRoute?.rank || '—'}</span></div>
      <div className="checkpoint-title"><strong>{currentRoute?.name} checkpoints</strong><span>{currentRoute?.checkpoints?.length || 0} samples</span></div>
      <div className="checkpoint-list">
        {currentRoute?.checkpoints.map(checkpoint => <div className="checkpoint-row" key={checkpoint.index}>
          <div className="cp-marker" style={{ background: riskColors[checkpoint.risk] || riskColors.Unavailable }}>{checkpoint.index}</div>
          <div className="cp-main"><strong>{formatMiles(checkpoint.miles_from_start)}</strong><span>{new Date(checkpoint.eta).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span><small>{checkpoint.weather_available ? `Wind ${checkpoint.wind_mph ?? '—'} mph · Rain ${checkpoint.rain_in_hr ?? '—'} · Snow ${checkpoint.snow_in_hr ?? '—'}` : 'Forecast unavailable for ETA'}</small></div>
          <RiskPill risk={checkpoint.risk} />
        </div>)}
      </div>
    </aside>
  );
}
