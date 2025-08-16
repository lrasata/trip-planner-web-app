import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/redux";
import { injectStore } from "./api/api";
import "./main.css";

import { registerSW } from "virtual:pwa-register";

// @ts-ignore
const updateSW = registerSW({
  onNeedRefresh() {
    console.log("New content available!");
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  },
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistration().then((reg) => {
    if (reg) {
      console.log("Service Worker is registered:", reg);
    } else {
      console.log("No Service Worker registered.");
    }
  });
} else {
  console.log("Service Workers not supported.");
}

// Inject store's dispatch and token getter into api
injectStore(store.dispatch, () => store.getState().auth);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
