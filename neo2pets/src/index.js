import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";

if (!Array.prototype.includes) {
  var includes = require("array-includes");

  Array.prototype.includes = element => {
    includes(this, element);
  };
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
