import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
