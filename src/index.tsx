import React from "react";
import { createRoot } from "react-dom/client";
import ApiTest from "./components/ApiTest";

function App() {
  return (
    <div>
      <h1>Art Gallery Project</h1>
      <p>Welcome to your React application!</p>
      <ApiTest />
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
