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

      { path: "dashboard/*", element: <Dashboard /> },

      { path: "login", element: <LoginForm /> },

      {
        path: "register",
        element: <RegisterForm />,
      },
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
