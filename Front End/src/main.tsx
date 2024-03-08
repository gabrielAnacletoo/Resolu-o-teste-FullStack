import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Global from "./assets/style/global.style.ts";
import { ClientsProvider } from "./utils/contextClients/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global />
    <ClientsProvider>
      <App />
    </ClientsProvider>
  </React.StrictMode>
);
