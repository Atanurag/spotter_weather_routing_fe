import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet';
import { CloudRain, Snowflake, Wind } from 'lucide-react';
import { riskColors } from '../utils/riskColors';
import { formatMiles } from '../utils/formatters';

function FitSelectedRoute({ currentRoute }) {
  const map = useMap();

  React.useEffect(() => {
    const coordinates = currentRoute?.geometry?.coordinates || [];
    if (!coordinates.length) return;

    const points = coordinates.map(([longitude, latitude]) => [latitude, longitude]);
    map.fitBounds(points, { padding: [30, 30], maxZoom: 8 });
  }, [currentRoute, map]);

  return null;
}

export default function RouteMap({ currentRoute, mapCenter }) {
  const coordinates = currentRoute?.geometry?.coordinates || [];

  return (
    <div className="map-panel">
      <div className="panel-heading">
        <div><span className="step">02</span><h3>Route map & weather corridor</h3></div>
        <span className="map-legend"><i /> Low <i /> Moderate <i /> High <i /> Severe</span>
      </div>

      <div className="map-wrap">
        <MapContainer center={mapCenter} zoom={6} scrollWheelZoom key={currentRoute?.id}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitSelectedRoute currentRoute={currentRoute} />

          {/* Draw only the selected route, so overlapping alternatives cannot hide it. */}
          {coordinates.length > 0 && (
            <Polyline
              key={currentRoute?.id}
              positions={coordinates.map(([longitude, latitude]) => [latitude, longitude])}
              pathOptions={{ color: '#22c6a0', weight: 6, opacity: 1 }}
            />
          )}

          {currentRoute?.checkpoints?.map(checkpoint => (
            <CircleMarker
              key={`${currentRoute.id}-${checkpoint.index}`}
              center={[checkpoint.coordinates[1], checkpoint.coordinates[0]]}
              radius={7}
              pathOptions={{
                color: '#fff',
                weight: 2,
                fillColor: riskColors[checkpoint.risk] || riskColors.Unavailable,
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <b>Checkpoint {checkpoint.index}</b><br />
                {formatMiles(checkpoint.miles_from_start)} from origin<br />
                ETA: {checkpoint.eta}<br />
                Risk: {checkpoint.risk}<br />
                Wind: {checkpoint.wind_mph ?? '—'} mph<br />
                Rain: {checkpoint.rain_in_hr ?? '—'} in/hr<br />
                Snow: {checkpoint.snow_in_hr ?? '—'} in/hr
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        <div className="map-overlay">
          <span className="overlay-dot" style={{ background: riskColors[currentRoute?.checkpoints?.[0]?.risk] || riskColors.Unavailable }} />
          Showing {currentRoute?.name || 'selected route'} · {currentRoute?.checkpoints?.length || 0} weather checkpoints
        </div>
      </div>

      <div className="weather-legend">
        <span><Wind size={15} /> Wind mph</span>
        <span><CloudRain size={15} /> Rain in/hr</span>
        <span><Snowflake size={15} /> Snow in/hr</span>
        <span className="legend-note">Forecast sampled near estimated checkpoint ETA</span>
      </div>
    </div>
  );
}
