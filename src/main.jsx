import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModuleProvider } from "./context/ContextProvider.jsx";
import { ApiKeyProvider } from "./context/ApiKeyContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ApiKeyProvider>
    <AuthProvider>
        <ModuleProvider>
          <App />
        </ModuleProvider>
    </AuthProvider>
      </ApiKeyProvider>
  </StrictMode>
);
