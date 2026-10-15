import { AlertTriangle, Clock3, MapPin, RefreshCw, Route as RouteIcon, Truck } from 'lucide-react';
import ForecastSlider from './ForecastSlider';

export default function TripForm({ form, onChange, onSubmit, loading, error }) {
  return (
    <section className="trip-card">
      <div className="section-heading"><div><span className="step">01</span><h2>Plan your trip</h2></div><span className="muted">Enter route details to run a safety analysis</span></div>
      <form onSubmit={onSubmit} className="trip-form">
        <label className="field"><span>ORIGIN</span><div className="input-wrap"><MapPin size={17} /><input name="origin" value={form.origin} onChange={onChange} placeholder="City, state or address" required /></div></label>
        <label className="field"><span>DESTINATION</span><div className="input-wrap"><MapPin size={17} /><input name="destination" value={form.destination} onChange={onChange} placeholder="City, state or address" required /></div></label>
        <label className="field"><span>DEPARTURE DATE & TIME</span><div className="input-wrap"><Clock3 size={17} /><input type="datetime-local" name="departure_time" value={form.departure_time} onChange={onChange} required /></div></label>
        <label className="field"><span>LOAD WEIGHT (LB)</span><div className="input-wrap"><Truck size={17} /><input type="number" min="0" step="1" name="load_weight_lb" value={form.load_weight_lb} onChange={onChange} required /></div></label>
        <label className="field"><span>CHECKPOINT INTERVAL</span><select name="checkpoint_miles" value={form.checkpoint_miles} onChange={onChange}><option value="10">Every 10 miles</option><option value="25">Every 25 miles</option><option value="50">Every 50 miles</option></select></label>
        <button className="analyze-btn" disabled={loading}>{loading ? <><RefreshCw className="spin" size={17} /> Analyzing routes…</> : <><RouteIcon size={17} /> Analyze safest routes</>}</button>
      </form>
      <ForecastSlider value={form.forecast_offset_hours} onChange={onChange} />
      {error && <div className="error-banner"><AlertTriangle size={18} />{error}</div>}
    </section>
  );
}
