import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://sightseeker.netlify.app";

  console.log(token, user);

  //  first useEffect checks localStorage for token already being there

  const retrieveUser = async () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("token");
    console.log("in retrieveUser: ", storedToken);
    const res = await fetch(`${backendURL}/user/retrieve`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    });
    const data = await res.json();
    console.log(res, data);
    if (!res.ok) {
      setIsLoading(false);
      logout();
    }
    if (res.ok) {
      setIsLoading(false);
      setUser(data.data);
      const invitationsReceived = data.data.friends.some(
        (friend) => friend.received
      );
      if (invitationsReceived) navigate("/invitation");
      // else navigate("/home");
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    if (storedToken && !user) retrieveUser();
    // console.log("there is a token: ", storedToken, "but no user: ", user);
  }, []);

  // sec useEffect either saves token to localStorage or removes it
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    console.log("from auth - user: ", user);
    console.log("token: ", token);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        user,
        setUser,
        setToken,
        isLoading,
        setIsLoading,
        backendURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
