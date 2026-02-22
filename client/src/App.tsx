import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgetPassword"
import Login from "./pages/Login"

const App = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
