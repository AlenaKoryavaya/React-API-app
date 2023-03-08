import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./components/app/App";

import "./style/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <App />
    </Router>
);
