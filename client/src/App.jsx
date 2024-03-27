// Assuming ProtectedRoute and PublicOnlyRoute are higher-order components (HOCs) that return
// either the component passed to them if the auth condition is met or a redirect component otherwise.

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Dashboard, Layout, LoginForm, RegisterForm } from "./pages";
import ProtectedRoute from "./components/ProtectRouteComponent/ProtectRoute";
import PublicOnlyRoute from "./components/ProtectRouteComponent/PublicRoute";
import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect } from "react";
import { checkIsLoggedIn } from "../redux/actionCreators/authActionCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Directly apply ProtectedRoute as a wrapper around Home
      { index: true, element: <Home /> },

      // Apply ProtectedRoute as a wrapper around Dashboard
      { path: "dashboard", element: <Dashboard /> },

      // Apply PublicOnlyRoute as a wrapper around LoginForm
      { path: "login", element: <LoginForm /> },

      // Apply PublicOnlyRoute as a wrapper around RegisterForm
      {
        path: "register",
        element: <RegisterForm />,
      },

      // Add other routes as needed
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
