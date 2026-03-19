import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.module.css";
import App from "./redux/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
