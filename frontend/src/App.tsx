import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import ManagerDashboard from "./pages/ManagerDashboard"
import { Users } from "./pages/Users"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <>
      <Toaster position="top-right" toastOptions={{
        duration: 4000, style: {
          background: '#363636',
          color: '#fff',
        }
      }} />
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />

          <Route element={<ProtectedRoute requiredRole="admin" />}  >
            <Route element={<Users />} path="/users" />
            <Route element={<AdminDashboard />} path="/admin-dashboard" />
          </Route>

          <Route element={<ProtectedRoute requiredRole="manager" />} >
            <Route element={<ManagerDashboard />} path="/manager-dashboard" />
          </Route>

          <Route element={<ProtectedRoute requiredRole="employee" />}  >
            <Route element={<UserDashboard />} path="/user-dashboard" />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
