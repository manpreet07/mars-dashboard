import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./index.css";
import Curiosity from "./components/Curiosity";
import Opportunity from "./components/Opportunity";
import Spirit from "./components/Spirit";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route>
          <Route path="/" element={<Dashboard />} />
          <Route path="/curiosity" element={<Curiosity />} />
          <Route path="/spirit" element={<Spirit />} />
          <Route path="/opportunity" element={<Opportunity />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
