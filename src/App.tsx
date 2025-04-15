import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./index.css";
import Curiosity from "./components/Curiosity";
import Opportunity from "./components/Opportunity";
import Spirit from "./components/Spirit";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/curiosity" element={<Curiosity />} />
    <Route path="/spirit" element={<Spirit />} />
    <Route path="/opportunity" element={<Opportunity />} />
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
