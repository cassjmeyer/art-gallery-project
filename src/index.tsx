import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ArtworkGallery from "./components/ArtworkGallery";
import ArtworkDetail from "./components/ArtworkDetail";
import ScrollToTop from "./components/ScrollToTop";
import { BASE_ROUTES } from "./constants";
import "./index.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to={BASE_ROUTES.GALLERY} />} />
        <Route path={BASE_ROUTES.GALLERY} element={<ArtworkGallery />} />
        <Route path={BASE_ROUTES.ARTWORK_DETAIL} element={<ArtworkDetail />} />
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
