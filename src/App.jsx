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
import TravelsPageEdit from "./pages/TravelPage/TravelPageEdit";
import ChatPage from "./pages/ChatPage/ChatPage";
import CreateTravelPlan from "./pages/TravelPage/CreateTravelPlan";
import PoiPreference from "./pages/FavoritePage/PoiPreference";
import Snake from "./components/SnakeGame/snake";
import ErrorPage from "./components/Error/ErrorPage";
import PlanTravel from "./pages/TravelPage/PlanTravel";
import FeatureProgress from "./pages/FeaturesPage/FeatureProgress";
import TravelPageEdit from "./pages/TravelPage/TravelPageEdit";

function App() {
  // const token = localStorage.getItem("token")
  // const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LandingPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/settings"
          element={user ? <SettingsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/features"
          element={user ? <FeatureProgress /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={user ? <AboutPage /> : <Navigate to="/" />}
        />
        <Route
          path="/initialsetup"
          element={user ? <InitialSetupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />
        <Route path="/spiner" element={<Loader />} />
        <Route
          path="/friends"
          element={user ? <FriendsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/chat"
          element={user ? <ChatPage /> : <Navigate to="/" />}
        />
        <Route
          path="/invitation"
          element={user ? <ReceivedInvitation /> : <Navigate to="/" />}
        />
        <Route
          path="/travelplan/open/:_id"
          element={user ? <TravelsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/travelplan/edit/:_id"
          element={user ? <TravelPageEdit /> : <Navigate to="/" />}
        />
        <Route
          path="/createtravelplan"
          element={user ? <CreateTravelPlan /> : <Navigate to="/" />}
        />
        <Route
          path="/plantravel/:id"
          element={user ? <PlanTravel /> : <Navigate to="/" />}
        />
        <Route
          path="/addfavorite"
          element={user ? <PoiPreference /> : <Navigate to="/" />}
        />
        <Route path="/snake" element={<Snake />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
