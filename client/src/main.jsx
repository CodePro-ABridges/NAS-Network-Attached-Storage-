import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../redux/store.js";

// Define a basic router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

// Use RouterProvider to wrap your App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
