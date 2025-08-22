import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export interface INavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<INavbarProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="navbar">
      <button
        className="icon-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <div className="brand">Inventory Dashboard</div>
      <div className="spacer" />
      <button
        className="icon-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
};
export default Navbar;
