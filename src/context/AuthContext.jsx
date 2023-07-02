import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const backendURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://sightseeker-backend.onrender.com";

  // console.log("####################HELLOOOO##################",token, user);

  //  first useEffect checks localStorage for token already being there

  const retrieveUser = async () => {
    const storedToken = localStorage.getItem("token");
    // console.log("in retrieveUser: ", storedToken);
    const res = await fetch(`${backendURL}/user/retrieve`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    });
    const data = await res.json();
    // console.log(res, data);
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
    setIsLoading(false)
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

  // useEffect(() => {
  //   console.log("from auth - user: ", user);
  //   console.log("token: ", token);
  // }, [user]);

  if (isLoading) {
    return null
  }

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


// The reason you are facing an issue when using const token = localStorage.getItem("token") instead of the token from the AuthContext is due to the asynchronous nature of retrieving the token.

// In the AuthContextProvider component, the retrieval of the token from localStorage and the subsequent retrieveUser function call are done asynchronously using useEffect with an empty dependency array ([]). This means that when the component is initially rendered, the retrieval of the token and the user data may not have completed yet.

// In your App component, when you use const token = localStorage.getItem("token"), you are trying to access the token synchronously before it has been retrieved and set in the AuthContextProvider component. This can result in the token being null or outdated, causing the login page to be displayed even if the user is already logged in.

// On the other hand, when you use the token from the AuthContext using const { token } = useContext(AuthContext), you are accessing the token value after it has been retrieved and set in the AuthContextProvider component. The context provides a reliable way to access the token value once it's available, ensuring that you can navigate to the appropriate pages based on the user's authentication status.

// To resolve the issue, it is recommended to use the token from the AuthContext as you are currently doing, rather than directly accessing it from localStorage. This ensures that you have access to the most up-to-date token value after it has been retrieved and set in the authentication context.