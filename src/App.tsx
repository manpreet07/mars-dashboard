import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./index.css";
import RoverManifest from "./components/RoverManifest";

const queryClient = new QueryClient();

export const SPACE_API_URL = import.meta.env.VITE_SPACE_API_URL;

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route
      path="/perseverance"
      element={<RoverManifest name="perseverance" />}
    />
    <Route path="/curiosity" element={<RoverManifest name="curiosity" />} />
    <Route path="/spirit" element={<RoverManifest name="spirit" />} />
    <Route path="/opportunity" element={<RoverManifest name="opportunity" />} />
  </Routes>
);

function App() {
  const isStandalone = import.meta.env.MODE === "development";

  return (
    <QueryClientProvider client={queryClient}>
      {isStandalone ? (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      ) : (
        <AppRoutes />
      )}
    </QueryClientProvider>
  );
}

export default App;
