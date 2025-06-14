import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtworkGallery from "./components/ArtworkGallery";
import ArtworkDetail from "./components/ArtworkDetail";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ArtworkGallery />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </Router>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
