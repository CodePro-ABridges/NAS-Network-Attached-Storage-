import React from "react";
import NavBar from "../components/NavComponent/NavBar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <NavBar className="w-64 fixed inset-y-0 left-0 z-30 bg-gray-800 text-white" />{" "}
      <main className="flex-1 pl-64">
        {" "}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
