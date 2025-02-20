import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router";
import { Provider } from "react-redux";
import { appStore } from "./Redux/appStore";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Provider store={appStore}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
