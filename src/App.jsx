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
import ChatPage from "./pages/ChatPage/ChatPage";
import CreateTravelPlan from "./pages/TravelPage/CreateTravelPlan";
import AddFavorite from "./pages/FavoritePage/PoiPreference";
import Snake from "./components/SnakeGame/snake";
import ErrorPage from "./components/Error/ErrorPage";
import PlanTravel from "./pages/TravelPage/PlanTravel";
import FeatureProgress from "./pages/FeaturesPage/FeatureProgress";

function App() {
  // const token = localStorage.getItem("token")
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={token ? <HomePage /> : <LandingPage />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/settings"
          element={token ? <SettingsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/features"
          element={token ? <FeatureProgress /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={token ? <AboutPage /> : <Navigate to="/" />}
        />
        <Route
          path="/initialsetup"
          element={token ? <InitialSetupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/" />}
        />
        <Route path="/spiner" element={<Loader />} />
        <Route
          path="/friends"
          element={token ? <FriendsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/chat"
          element={token ? <ChatPage /> : <Navigate to="/" />}
        />
        <Route
          path="/invitation"
          element={token ? <ReceivedInvitation /> : <Navigate to="/" />}
        />
        <Route
          path="/travelplan/open/:_id"
          element={token ? <TravelsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/travelplan/edit/:_id"
          element={token ? <TravelsPageEdit /> : <Navigate to="/" />}
        />
        <Route
          path="/createtravelplan"
          element={token ? <CreateTravelPlan /> : <Navigate to="/" />}
        />
        <Route
          path="/plantravel"
          element={token ? <PlanTravel /> : <Navigate to="/" />}
        />
        <Route
          path="/addfavorite"
          element={token ? <AddFavorite /> : <Navigate to="/" />}
        />
        <Route path="/snake" element={<Snake />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
