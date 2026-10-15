export default function ForecastSlider({ value, onChange }) {
  return (
    <div className="forecast-control">
      <div><span className="forecast-label">FORECAST SCENARIO</span><strong>{Number(value) === 0 ? 'Departure time' : `Departure +${value} hours`}</strong></div>
      <input aria-label="Forecast offset in hours" type="range" min="0" max="48" step="1" name="forecast_offset_hours" value={value} onChange={onChange} />
      <div className="range-ends"><span>Now</span><span>+48 hours</span></div>
      <span className="forecast-help">Move the slider, then re-run analysis to compare forecast timing.</span>
    </div>
  );
}
