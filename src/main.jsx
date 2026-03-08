import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./styles/main.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider donne accès au store Redux à tous les composants */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
