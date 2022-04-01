import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing_page/landing_page";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Settings from "./pages/settings/settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="admin/*" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
