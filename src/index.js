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
import { OrdersProvider } from "./context/OrdersContext";
import Login from "./pages/Login";
import Plant from "./pages/Plant";
import Orders from "./pages/Orders";
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
import { SocketProvider } from "./context/SocketContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Users from "./pages/Users";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Error from "./components/Error";
import Reset from "./pages/Reset";
import PasswordReset from "./pages/PasswordReset";
import EmailVerificationReset from "./pages/EmailVerificationReset";
import Landing from "./pages/Landing";
import CommonRoutesComponent from "./components/CommonRoutesComponent";
import Chat from "./pages/Chat";
import { ChatProvider } from "./context/ChatContext";
import ChiSiamo from "./pages/ChiSiamo";
import UserProfile from "./pages/UserProfile";

// import { io } from "socket.io-client";
// const url =
//   process.env.REACT_APP_NODE_ENV === "test"
//     ? process.env.REACT_APP_TEST_DOMAIN_NAME_SERVER
//     : process.env.REACT_APP_DOMAIN_NAME_SERVER;
// const socket = io(url);

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonRoutesComponent />,

    children: [
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
        path: "chi-siamo",
        element: <ChiSiamo />,
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
        path: "orders",
        element: <Orders />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      // {
      //   path: "verification-success",
      //   element: <EmailVerification />,
      // },
      {
        path: "verify/:token",
        element: <EmailVerification />,
      },
      {
        path: "verify-reset/:token",
        element: <EmailVerificationReset />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <ChatProvider>
          <PlantsProvider>
            <OrdersProvider>
              <FilterProvider>
                <ToastContainer />
                <Error />
                <RouterProvider router={router} />
              </FilterProvider>
            </OrdersProvider>
          </PlantsProvider>
        </ChatProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
