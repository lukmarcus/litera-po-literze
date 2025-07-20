import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function getLanguagesFromHash(): {
  appLang: "pl" | "en";
  packLang: "pl" | "en" | "testpack";
} {
  const hash = window.location.hash.slice(1);
  const [appLang, packLang] = hash.split("-");
  return {
    appLang: appLang === "pl" || appLang === "en" ? appLang : "en",
    packLang:
      packLang === "pl" || packLang === "en" || packLang === "testpack"
        ? packLang
        : "en",
  };
}

function setLanguagesToHash(
  appLang: "pl" | "en",
  packLang: "pl" | "en" | "testpack"
) {
  window.location.hash = `${appLang}-${packLang}`;
}

const { appLang, packLang } = getLanguagesFromHash();

root.render(
  <React.StrictMode>
    <App
      initialAppLang={appLang}
      initialPackLang={packLang}
      setLanguagesToHash={setLanguagesToHash}
    />
  </React.StrictMode>
);
