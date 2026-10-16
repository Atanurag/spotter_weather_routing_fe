# Spotter Weather-Aware Truck Routing — Frontend

A React + Vite interface for comparing truck routes using weather forecasts, load weight, checkpoint risk, and travel time.

---

## ✨ What It Does

- **Trip inputs:** Enter origin, destination, departure date/time, load weight, and checkpoint interval.
- **Backend integration:** Sends trip details to the Django API.
- **Route comparison:** Displays available routes, distances, travel times, and route summaries.
- **Weather checkpoints:** Shows checkpoint weather conditions and risk levels.
- **Interactive map:** Displays route geometry and checkpoints.
- **Forecast slider:** Lets users inspect forecast timing where supported by the API response.
- **Recommended route:** Highlights the route selected by the backend recommendation logic.

> **Important:** Route generation, weather lookup, risk calculations, and route ranking are handled by the backend. The frontend displays the API response.

## 🧰 Requirements

Make sure these are installed:

- **Node.js** — an active LTS version is recommended.
- **pnpm** — this project includes `pnpm-lock.yaml`.
- **Django backend** — running locally or deployed to a reachable URL.

Check your versions:

```bash
node --version
pnpm --version
```

## 🚀 Run Locally

### 1. Install dependencies

Open a terminal in the frontend directory — the folder containing `package.json` — and run:

```bash
pnpm install
```

### 2. Configure the backend URL

Create a `.env` file in the frontend project root, next to `package.json`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For a hosted backend, replace the local URL with your deployed backend URL.

> If `src/services/routingApi.js` uses a different environment-variable name or a hard-coded URL, make sure the configuration matches that file.

### 3. Start the development server

```bash
pnpm dev
```

Open the URL printed by Vite. It is usually:

**http://localhost:5173**

Keep the terminal running while using the app.

### 4. Build and preview

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Vite writes the production files to the `dist/` directory.

## 🔌 API Connection

The expected backend endpoints are:

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health/` | Check whether the backend is running |
| `POST` | `/api/analyze/` | Analyze the trip and return route/weather results |

If your paths differ, check:

- `src/services/routingApi.js`
- `config/urls.py`
- `api/urls.py`

### CORS setup

If the browser reports a CORS error, configure Django to allow the frontend origin:

- Local development: `http://localhost:5173`
- Hosted environment: your actual deployed frontend URL

## 🧭 Typical User Workflow

1. Enter the **origin** and **destination**.
2. Choose the **departure date/time** and enter the **load weight in pounds**.
3. Choose a checkpoint interval — **10, 25, or 50 miles**, if the UI provides this selector.
4. Submit the trip for analysis.
5. Compare available routes by **distance, travel time, weather, and risk**.
6. Inspect routes and weather checkpoints on the map.
7. Review the recommended route and its summary.

## 🛠️ Troubleshooting

| Problem | What to check |
|---|---|
| API request fails | Confirm Django is running and the URL in `.env` is correct. |
| CORS error | Allow the frontend origin in Django settings. |
| Map is blank | Check the browser console and confirm map tiles can load. |
| `.env` changes are ignored | Restart the Vite dev server with `pnpm dev`. |
| Hosted site calls `localhost` | Set `VITE_API_URL` in the hosting provider and rebuild/redeploy. |
| Fewer than three routes appear | The routing provider may return fewer than three alternatives for a trip. |

## 📁 Main Project Structure

```text
src/
├── components/       # UI, route cards, map, forecast and risk display
├── services/         # API request helpers
├── utils/            # Formatting and risk-color helpers
├── App.jsx           # Main application flow
├── main.jsx          # React entry point
└── styles.css        # Application styles
```

## 🔒 Notes

- Keep `.env` out of Git. **Do not commit secrets.**
- Public routing, geocoding, and weather services may have usage limits.
- Forecast accuracy depends on the provider and its available forecast horizon.
