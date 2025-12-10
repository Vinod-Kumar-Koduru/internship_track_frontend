import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AppContext } from "./context/Appcontext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AppContext);


  return token ? children : <Navigate to="/login" replace />;
}
