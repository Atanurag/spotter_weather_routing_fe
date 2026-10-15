const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export async function analyzeTrip(form) {
  const response = await fetch(`${API_BASE_URL}/api/analyze/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...form,
      load_weight_lb: Number(form.load_weight_lb),
      checkpoint_miles: Number(form.checkpoint_miles),
      forecast_offset_hours: Number(form.forecast_offset_hours),
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Unable to analyze trip');
  return result;
}
