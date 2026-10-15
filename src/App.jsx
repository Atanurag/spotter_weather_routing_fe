import { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TripForm from './components/TripForm';
import ResultsSection from './components/ResultsSection';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { analyzeTrip } from './services/routingApi';

const initialForm = {
  origin: 'Chicago, IL',
  destination: 'Indianapolis, IN',
  departure_time: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
  load_weight_lb: '25000',
  checkpoint_miles: '25',
  forecast_offset_hours: 0,
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [data, setData] = useState(null);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm(previousForm => ({ ...previousForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setData(null);
    try {
      const result = await analyzeTrip(form);
      setData(result);
      setActiveRouteIndex(0);
    } catch (requestError) {
      setError(`${requestError.message}. Check that Django is running and the external APIs are reachable.`);
    } finally {
      setLoading(false);
    }
  }

  const routes = data?.routes || [];
  const currentRoute = routes[activeRouteIndex] || routes[0];
  const mapCenter = useMemo(() => {
    const coordinates = currentRoute?.geometry?.coordinates;
    return coordinates?.length ? [coordinates[0][1], coordinates[0][0]] : [41.5, -87.5];
  }, [currentRoute]);

  return (
    <div className="app-shell">
      <Header />
      <main className="main">
        <Hero />
        <TripForm form={form} onChange={handleFormChange} onSubmit={handleSubmit} loading={loading} error={error} />
        {data && <ResultsSection data={data} routes={routes} activeRouteIndex={activeRouteIndex} onSelectRoute={setActiveRouteIndex} currentRoute={currentRoute} mapCenter={mapCenter} />}
        {!data && !loading && <EmptyState />}
        <Footer />
      </main>
    </div>
  );
}
