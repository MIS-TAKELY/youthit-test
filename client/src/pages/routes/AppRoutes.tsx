import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import ProductsList from "../../components/dashboard/ProductList";
import Products from "../../components/user/Products";
import ForgotPassword from "../auth/ForgetPassword";
import Login from "../auth/Login";
import Signup from "../auth/Register";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/products" element={<Products />} />
      {/* Admin dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dashboard/products"
        element={
          <ProtectedRoute>
            <ProductsList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
