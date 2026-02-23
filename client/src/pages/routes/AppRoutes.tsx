import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import ProductsList from "../../components/dashboard/ProductList";
import Products from "../../components/user/Products";
import ForgotPassword from "../auth/ForgetPassword";
import Login from "../auth/Login";
import Signup from "../auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "../../components/dashboard/AddProduct";
import EditProduct from "../../components/dashboard/EditProduct";

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

      <Route
        path="/dashboard/products/add"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/products/edit/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
