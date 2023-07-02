import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import DataContextProvider from "./context/DataContext";
import MapContextProvider from "./context/MapContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <MapContextProvider>
          <App />
        </MapContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
