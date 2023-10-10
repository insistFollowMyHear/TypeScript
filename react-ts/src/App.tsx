import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login";
import HomePage from "./views/home";

export default () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/login" Component={LoginPage}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}