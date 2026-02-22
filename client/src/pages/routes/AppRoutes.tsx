import { Routes, Route } from "react-router-dom"
import Login from "../auth/Login"
import Signup from "../auth/Register"
import ForgotPassword from "../auth/ForgetPassword"
import AdminDashboard from "../../components/dashboard/AdminDashboard"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Admin dashboard routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes