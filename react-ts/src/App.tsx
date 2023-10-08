import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login";

export default () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/login" Component={LoginPage}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}