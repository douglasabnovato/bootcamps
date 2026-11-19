import React from "react";
import ReactDOM from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
// Raleway servida pelo próprio site (fontsource): sem o CSS do Google bloqueando a renderização e sem enviar o IP de quem visita a terceiros (#73).
import "@fontsource-variable/raleway";
import "./styles/main.css";
import { carregarIdentificacao } from "../shared/api/learntechContent";

carregarIdentificacao();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>,
);
