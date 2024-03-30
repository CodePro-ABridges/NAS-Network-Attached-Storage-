import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeComponent from "../components/HomeComponent/HomeComponent";
import SubBar from "../components/SubBarComponent/SubBar";
import CreateFolder from "../components/DashboardComponents/CreateFolder/CreateFolder";
import { getFolders } from "../../redux/actionCreators/fileFolderActionCreator";
import { Route, Routes } from "react-router-dom";
import FolderComponent from "../components/DashboardComponents/FolderComponent/FolderComponent";

const Dashboard = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  //setup for passing and retrieving data
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.filefolders.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  //useEffect for retrieving data
  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
    }
  }, [isLoading, userId, dispatch]);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl font-semibold my-8">Welcome to Dashboard</h1>

      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      <SubBar setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      <Routes>
        <Route path="" element={<HomeComponent />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
