import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeComponent from "../components/HomeComponent/HomeComponent";
import SubBar from "../components/SubBarComponent/SubBar";
import CreateFolder from "../components/DashboardComponents/CreateFolder/CreateFolder";

const Dashboard = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold my-8">Welcome to Dashboard</h1>

      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      <SubBar setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      <HomeComponent />
    </div>
  );
};

export default Dashboard;
