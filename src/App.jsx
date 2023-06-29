import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import FeaturesPage from "./pages/FeaturesPage/FeaturesPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import InitialSetupPage from "./pages/InitialSetupPage/InitialSetupPage";
import HomePage from "./pages/HomePage/HomePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ReceivedInvitation from "./pages/FriendsPage/ReceivedInvitation";
import Loader from "./components/Loader/Loader";
import TravelsPage from "./pages/TravelPage/TravelsPage";
import CorrectChatPage from "./pages/ChatPage/ChatPage";
import CreateTravelPlan from "./pages/TravelPage/CreateTravelPlan";
import AddFavorite from "./pages/FavoritePage/AddFavorite";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <LandingPage />} />
        <Route path="/login" element={token ? <HomePage /> : <LoginPage />} />
        <Route
          path="/register"
          element={token ? <HomePage /> : <RegisterPage />}
        />
        <Route
          path="/settings"
          element={token ? <SettingsPage /> : <LandingPage />}
        />
        <Route
          path="/features"
          element={token ? <FeaturesPage /> : <LandingPage />}
        />
        <Route
          path="/about"
          element={token ? <AboutPage /> : <LandingPage />}
        />
        <Route
          path="/initialsetup"
          element={token ? <InitialSetupPage /> : <LandingPage />}
        />
        <Route path="/home" element={token ? <HomePage /> : <LandingPage />} />
        <Route path="/spiner" element={<Loader />} />
        <Route
          path="/friends"
          element={token ? <FriendsPage /> : <LandingPage />}
        />
        <Route path="/chat" element={token ? <CorrectChatPage /> : <LandingPage />} />
        <Route
          path="/invitation"
          element={token ? <ReceivedInvitation /> : <LandingPage />}
        />
        <Route
          path="/travelplan"
          element={token ? <TravelsPage /> : <LandingPage />}
        />
        <Route
          path="/createtravelplan"
          element={token ? <CreateTravelPlan /> : <LandingPage />}
        />
        <Route
          path="/addfavorite"
          element={token ? <AddFavorite /> : <LandingPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
