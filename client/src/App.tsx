import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashboardComponent/dashboard.tsx";
import LoginForm from "./components/LoginComponent/Login.tsx";
import RegisterForm from "./components/RegisterComponent/Register.tsx";
import "./index.css";

const App: React.FC = () => {
  return (
    <>
      <main className="w-full h-screen flex flex-row relative">
        <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
