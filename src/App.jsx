import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "../src/layout/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import UserProfil from "./pages/UserProfil";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<UserProfil />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
