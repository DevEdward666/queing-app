import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "typeface-poppins";
var url = `${process.env.REACT_APP_BASE_URL}/api/pages/db_get_hosp_logo`;
const auth = window.localStorage.getItem("tokenizer");
var bearer_token = auth;
var bearer = "Bearer " + bearer_token;

const initializeDocument = async () => {
  const response = await fetch(url, {
    method: "GET",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });

  const jsonData = await response.json();
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = jsonData.data;
  document.getElementsByTagName("head")[0].appendChild(link);
};
initializeDocument();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
