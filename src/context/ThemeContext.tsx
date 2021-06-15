import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeType = "dark" | "light";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>(null!);

const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    const body = document.body;
    body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handlePreferScheme = (event: any) => {
      if (event.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handlePreferScheme);

    return () => {
      window.removeEventListener("change", handlePreferScheme);
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const isTheme = theme === "light" ? "dark" : "light";
    setTheme(isTheme);
  }, [theme]);

  const store = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
