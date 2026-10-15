import { ShieldCheck } from 'lucide-react';
import { formatDuration, formatMiles } from '../utils/formatters';

export default function RouteCards({ routes, activeRouteIndex, onSelectRoute }) {
  return (
    <div className="route-grid">
      {routes.map((route, index) => (
        <button key={route.id} className={`route-card ${activeRouteIndex === index ? 'selected' : ''} ${route.recommended ? 'recommended' : ''}`} onClick={() => onSelectRoute(index)}>
          <div className="route-card-top"><span className="route-letter">{String.fromCharCode(65 + index)}</span>{route.recommended && <span className="recommended-label"><ShieldCheck size={13} /> RECOMMENDED</span>}</div>
          <h3>{route.name}</h3>
          <div className="route-numbers"><div><strong>{formatMiles(route.summary.distance_miles)}</strong><span>Distance</span></div><div><strong>{formatDuration(route.summary.duration_minutes)}</strong><span>Est. drive</span></div></div>
          <div className="route-risk-row"><span>Severe miles <b>{formatMiles(route.summary.severe_miles)}</b></span><span>High miles <b>{formatMiles(route.summary.high_miles)}</b></span></div>
          <div className="route-card-bottom"><span>Average risk score</span><strong>{route.summary.average_risk === null ? '—' : `${route.summary.average_risk}/4`}</strong></div>
        </button>
      ))}
    </div>
  );
}
