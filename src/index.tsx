import { createRoot } from "react-dom/client";
import ArtworkGallery from "./components/ArtworkGallery";

function App() {
  return (
    <div>
      <ArtworkGallery />
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
