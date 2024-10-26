// src/protectedRoute.js
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Util from "../../helpers/Util";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  
  if (!isAuthenticated) {
    Util.auth(dispatch);
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
