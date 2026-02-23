import { Routes, Route } from "react-router-dom"
import Login from "../auth/Login"
import Signup from "../auth/Register"
import ForgotPassword from "../auth/ForgetPassword"
import AdminDashboard from "../../components/dashboard/AdminDashboard"
import ProtectedRoute from "./ProtectedRoute"
import ProductsList from "../../components/dashboard/ProductList"
<<<<<<< HEAD
import AddProduct from "../../components/dashboard/AddProduct"
=======
import Products from "../../components/user/Products"
>>>>>>> 673052a5c3304c2e97707302aa364b3dfa2c6258

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

            <Route
                path="/dashboard/products/add"
                element={
                    <ProtectedRoute>
                        <AddProduct />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes