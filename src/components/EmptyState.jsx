import { MapPin, Route as RouteIcon, ShieldCheck, Wind } from 'lucide-react';

export default function EmptyState() {
  return (
    <section className="empty-state"><div className="empty-icon"><RouteIcon size={26} /></div><h2>Ready when you are.</h2><p>Enter your trip details above to compare available routes, evaluate weather at checkpoint arrival times, and find the lowest-risk option.</p><div className="empty-points"><span><ShieldCheck size={16} /> Load-aware risk rules</span><span><Wind size={16} /> Hourly weather forecast</span><span><MapPin size={16} /> Interactive route map</span></div></section>
  );
}
