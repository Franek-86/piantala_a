import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlantsProvider } from "./context/PlantsContext";
import Login from "./pages/Login";
import Plant from "./pages/Plant";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AddPlant from "./pages/AddPlant";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPlants from "./pages/MyPlants";
import Legend from "./pages/Legend";
import Info from "./pages/Info";
import BottomBar from "./components/BottomBar";
import { CheckoutForm } from "./pages/CheckoutForm";
import { Return } from "./pages/Return";
import OwnedPlants from "./pages/OwnedPlants";
import Contacts from "./pages/Contacts";
import EmailVerification from "./pages/EmailVerification";
import Plates from "./pages/Plates";
import { FilterProvider } from "./context/FilterContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Users from "./pages/Users";
import { ToastContainer } from "react-toastify";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Register from "./pages/Register";
import Error from "./components/Error";
import Reset from "./pages/Reset";
import PasswordReset from "./pages/PasswordReset";
import EmailVerificationReset from "./pages/EmailVerificationReset";
import Landing from "./pages/Landing";

serviceWorkerRegistration.register();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/passwordReset/:token",
    element: <PasswordReset />,
  },
  {
    path: "/map",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "addPlant",
        element: <AddPlant />,
      },
      {
        path: ":plantId",
        element: <Plant />,
      },
    ],
  },
  {
    path: "myPlants",
    element: <MyPlants />,
  },
  {
    path: "legend",
    element: <Legend />,
  },
  {
    path: "info",
    element: <Info />,
  },
  {
    path: "checkout",
    element: <CheckoutForm />,
  },
  {
    path: "return",
    element: <Return />,
  },
  {
    path: "bookedPlants",
    element: <OwnedPlants />,
  },
  {
    path: "plates",
    element: <Plates />,
  },
  {
    path: "contacts",
    element: <Contacts />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "verification-success",
    element: <EmailVerification />,
  },
  {
    path: "verification-success-reset/:token",
    element: <EmailVerificationReset />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PlantsProvider>
        <FilterProvider>
          <ToastContainer />
          <Error />
          <RouterProvider router={router} />
        </FilterProvider>
      </PlantsProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
