import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModuleProvider } from "./context/ContextProvider.jsx";
import { ApiKeyProvider } from "./context/ApiKeyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModuleProvider>
      <ApiKeyProvider>
        <App />
      </ApiKeyProvider>
    </ModuleProvider>
  </StrictMode>
);
