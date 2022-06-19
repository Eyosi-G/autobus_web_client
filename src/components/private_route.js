import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  const { data } = useSelector((state) => state.login);
  if (!data || data.user.role !== role) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
