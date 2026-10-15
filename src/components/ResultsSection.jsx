import { AlertTriangle, ShieldCheck } from 'lucide-react';
import RouteCards from './RouteCards';
import RouteMap from './RouteMap';
import RiskBreakdown from './RiskBreakdown';

export default function ResultsSection({ data, routes, activeRouteIndex, onSelectRoute, currentRoute, mapCenter }) {
  return (
    <section className="results-section">
      <div className="results-heading"><div><div className="eyebrow">ANALYSIS COMPLETE</div><h2>Your route outlook</h2><p>{data.origin.label.split(',').slice(0, 2).join(',')} <span>→</span> {data.destination.label.split(',').slice(0, 2).join(',')} · {Number(data.load_weight_lb).toLocaleString()} lb load</p></div><div className="result-count"><strong>{routes.length}</strong><span>route option{routes.length === 1 ? '' : 's'} returned</span></div></div>
      <RouteCards routes={routes} activeRouteIndex={activeRouteIndex} onSelectRoute={onSelectRoute} />
      {data.notice && <div className="notice"><AlertTriangle size={15} />{data.notice}</div>}
      <div className="analysis-layout"><RouteMap currentRoute={currentRoute} mapCenter={mapCenter} /><RiskBreakdown routes={routes} currentRoute={currentRoute} /></div>
      <div className="rules-footnote"><ShieldCheck size={17} /><div><strong>Risk rules applied</strong><span>Wind ≥55 mph means No Travel for any load. Wind 45–54 mph with load over 30,000 lb means No Travel. Wind 35–44 mph with load over 40,000 lb is Severe. Rain and snow thresholds follow the assessment brief.</span></div></div>
    </section>
  );
}
