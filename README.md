Spotter Weather-Aware Truck Routing — Frontend
React + Vite interface for comparing truck routes using weather forecasts, load weight, checkpoint risk, and travel time.
What it does
- Collects origin, destination, departure date/time, load weight, and checkpoint interval.
- Sends the trip to the Django API.
- Displays route alternatives, route summaries, checkpoint weather/risk, and route geometry on a map.
- Lets the user inspect forecast timing with the forecast slider, where supported by the API response.
- Highlights the recommended route using the recommendation returned by the backend.
The backend performs route, weather, and risk calculations. The frontend displays the API response.
Requirements
- Node.js (an active LTS version is recommended)
- pnpm (the project includes pnpm-lock.yaml)
- Django backend running locally or a deployed backend URL
Check versions:
node --version
pnpm --version
Run locally
1. Install dependencies
Run from the directory containing package.json:
pnpm install
2. Configure the backend URL
Create .env in the frontend project root, next to package.json:
VITE_API_URL=http://127.0.0.1:8000
For a hosted backend, use its actual URL. If src/services/routingApi.js uses a different environment-variable name or a hard-coded URL, make the value match that file.
3. Start the development server
pnpm dev
Open the URL printed by Vite, usually http://localhost:5173.
4. Build and preview
pnpm build
pnpm preview
The production build is written to dist/.
API connection
Expected endpoints:
- GET /api/health/
- POST /api/analyze/
Check src/services/routingApi.js, config/urls.py, and api/urls.py if the paths differ.
If the browser reports CORS errors, configure Django to allow http://localhost:5173 and the actual hosted frontend origin.
Typical workflow
1. Enter origin and destination.
2. Choose departure date/time and load weight in pounds.
3. Choose a checkpoint interval (10, 25, or 50 miles, if available in the UI).
4. Submit the trip.
5. Compare route duration, distance, weather, and risk summaries.
6. Inspect routes and checkpoints on the map.
7. Review the recommended route.
Troubleshooting
- API request fails: Check that Django is running and the URL in .env is correct.
- CORS error: Allow the frontend origin in Django; changing the frontend alone will not fix it.
- Map is blank: Check the browser console and whether map tiles can load.
- .env changes are ignored: Restart pnpm dev.
- Hosted site calls localhost: Set VITE_API_URL in the hosting provider and rebuild/redeploy.
- Fewer than three routes appear: The routing provider may return fewer than three alternatives for a trip.
Main folders
src/
  components/       UI components, route cards, map, forecast and risk display
  services/         API request helpers
  utils/            Formatting and risk-color helpers
  App.jsx           Main application flow
  main.jsx          React entry point
  styles.css        Application styles
Notes
- Keep .env out of Git. Do not commit secrets.
- Public routing, geocoding, and weather services may have usage limits.
- Forecast accuracy depends on the provider and forecast horizon.