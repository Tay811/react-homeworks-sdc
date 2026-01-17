import { useTheme } from "../../../context/theme/ThemeContext";
import "./style.css";

export default function ThemeToggle() {
  const { mode, resolvedTheme, setMode, toggle } = useTheme();

  const nextLabel = resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <div className="themeToggle">
      <button
        type="button"
        className="themeToggle__btn"
        onClick={toggle}
        aria-label={nextLabel}
        aria-pressed={resolvedTheme === "dark"}
        title={nextLabel}
      >
        {resolvedTheme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
