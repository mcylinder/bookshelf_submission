import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Search from "./Search";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="search" element={<Search />} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
