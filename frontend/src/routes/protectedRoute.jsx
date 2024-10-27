import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Util from "../../helpers/Util";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      // Call authentication utility and set loading state
      Util.auth(dispatch).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  // Show loading indicator or prevent unauthorized access
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner if desired
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
