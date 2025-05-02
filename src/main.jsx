import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// Import PrimeReact styles and theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";

import { CapacityProvider } from "./context/CapacityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CapacityProvider>
      <App />
    </CapacityProvider>
  </React.StrictMode>
);