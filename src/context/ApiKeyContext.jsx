import { createContext, useContext, useState, useEffect } from "react";

const ApiKeyContext = createContext(null);

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");

  useEffect(() => {
    localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => useContext(ApiKeyContext);
