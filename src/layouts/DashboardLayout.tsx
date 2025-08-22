import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./DashboardLayout.css";

const DashboardLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="layout">
      <Sidebar open={open} onToggle={() => setOpen((o) => !o)} />
      <div className="layout-main">
        <Navbar onToggleSidebar={() => setOpen((o) => !o)} />
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
