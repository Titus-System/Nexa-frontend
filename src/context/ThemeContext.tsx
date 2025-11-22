import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Carrega valor salvo no localStorage
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setDarkMode(false);
      localStorage.setItem("darkMode", "false");
      document.body.classList.remove("dark-mode");
    }
  }, [user]);

  useEffect(() => {
    // Aplica ao <body>
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Salva no localStorage
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
