import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Main from "./Main";
import { Login } from "./Login";
import PrivateRoute from "../components/PrivateRoute";
import Home from "./Home";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home/*"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h3>Page Not Found</h3>} />
    </Routes>
  );
}
