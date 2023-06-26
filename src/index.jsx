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
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import ChatPage from "./pages/ChatPage/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/initialsetup",
    element: <InitialSetupPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/spiner",
    element: <Loader />,
  },
  {
    path: "/friends",
    element: <FriendsPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />
  }
    element: <Chat />,
  },
  {
    path: "/invitation",
    element: <ReceivedInvitation />,
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
