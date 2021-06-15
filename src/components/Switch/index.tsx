import { useTheme } from "../../context/ThemeContext";

const Switch = () => {
  const { toggleTheme } = useTheme();

  return <span id="switch" className="switch" onClick={toggleTheme}></span>;
};

export default Switch;
