import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import ErrorPage from "./pages/Error";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./providers/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
