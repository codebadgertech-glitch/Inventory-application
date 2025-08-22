import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export interface ISidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({ open, onToggle }) => {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <span>Menu</span>
        <button className="icon-btn" onClick={onToggle} aria-label="Collapse">
          ⮜
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/inventory"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Inventory
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};
export default Sidebar;
