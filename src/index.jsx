import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import FeaturesPage from "./pages/FeaturesPage/FeaturesPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import InitialSetupPage from "./pages/InitialSetupPage/InitialSetupPage";
import HomePage from "./pages/HomePage/HomePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import ReceivedInvitation from "./pages/FriendsPage/ReceivedInvitation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Loader from "./components/Loader/Loader";
import DataContextProvider from "./context/DataContext";
import Chat from "./components/Chat/Chat";

const token = localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: token? <HomePage /> : <App />,
  },
  {
    path: "/login",
    element: token? <HomePage /> : <LoginPage />,
  },
  {
    path: "/register",
    element: token? <HomePage /> : <RegisterPage />,
  },
  {
    path: "/settings",
    element: token? <SettingsPage /> : <App />,
  },
  {
    path: "/features",
    element: token? <FeaturesPage /> : <App />,
  },
  {
    path: "/about",
    element: token? <AboutPage /> : <App />,
  },
  {
    path: "/initialsetup",
    element: token? <InitialSetupPage /> : <App />,
  },
  {
    path: "/home",
    element: token? <HomePage /> : <App />,
  },
  {
    path: "/spiner",
    element: <Loader />,
  },
  {
    path: "/friends",
    element: token? <FriendsPage /> : <App />,
  },
  {
    path: "/chat",
    element: token? <Chat /> : <App />,
  },
  {
    path: "/invitation",
    element: token? <ReceivedInvitation /> : <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
