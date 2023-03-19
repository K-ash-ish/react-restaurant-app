import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import App from "./App";
import { FirebaseProvider } from "./context/Firebase";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </Provider>
);
