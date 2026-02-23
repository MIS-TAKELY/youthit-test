import { Routes, Route } from "react-router-dom"
import Login from "../auth/Login"
import Signup from "../auth/Register"
import ForgotPassword from "../auth/ForgetPassword"
import AdminDashboard from "../../components/dashboard/AdminDashboard"
import ProtectedRoute from "./ProtectedRoute"
import ProductsList from "../../components/dashboard/ProductList"
import Products from "../../components/user/Products"

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
            />,

            <Route
                path="/dashboard/products"
                element={
                    <ProtectedRoute>
                        <ProductsList />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes