import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
