import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RutaPrivata({ children }) {
  const { logat } = useAuth();
  const location = useLocation();

  if (!logat) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
