import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashboardComponent/dashboard.tsx";
import LoginForm from "./components/LoginComponent/Login.tsx";
import RegisterForm from "./components/RegisterComponent/Register.tsx";
import Home from "./components/HomeComponent/Home.tsx";
import Layout from "./components/LayoutComponent/Layout.tsx";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
