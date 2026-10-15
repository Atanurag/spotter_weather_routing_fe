export function formatMiles(value) {
  return `${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 1 })} mi`;
}

export function formatDuration(value) {
  const hours = Math.floor((value || 0) / 60);
  const minutes = Math.round((value || 0) % 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes} min`;
}
