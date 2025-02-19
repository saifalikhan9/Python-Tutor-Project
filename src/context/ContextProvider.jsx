// ModuleContext.js
import { createContext, useContext, useState } from "react";

const ModuleContext = createContext(null);

export const ModuleProvider = ({ children }) => {
  const [module, setModule] = useState(null);
  return (
    <ModuleContext.Provider value={{ module, setModule }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => useContext(ModuleContext);
