import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/redux";
import { injectStore } from "./api/api";
import "./main.css";

// Inject store's dispatch and token getter into api
injectStore(store.dispatch, () => store.getState().auth);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
