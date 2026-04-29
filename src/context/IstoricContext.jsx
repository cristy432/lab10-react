import { createContext, useContext, useState, useCallback } from "react";

const IstoricContext = createContext(null);

export function IstoricProvider({ children }) {
  const [istoric, setIstoric] = useState([]);

  const adaugaInIstoric = useCallback((pagina) => {
    setIstoric((prev) => {
      const filtrat = prev.filter((p) => p.id !== pagina.id);
      return [pagina, ...filtrat].slice(0, 10);
    });
  }, []);

  const stergeIstoric = useCallback(() => setIstoric([]), []);

  return (
    <IstoricContext.Provider value={{ istoric, adaugaInIstoric, stergeIstoric }}>
      {children}
    </IstoricContext.Provider>
  );
}

export function useIstoric() {
  return useContext(IstoricContext);
}
