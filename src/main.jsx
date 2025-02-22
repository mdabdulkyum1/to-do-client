import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import { HeadProvider } from "react-head";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeadProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HeadProvider>
  </StrictMode>
);
