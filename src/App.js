import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/private_route";
import Login from "./pages/auth/login";
import LandingPage from "./pages/landing_page/landing_page";
import Layout from "./pages/layout";
import Settings from "./pages/settings/settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin/*"
          element={
            <PrivateRoute role="admin">
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
