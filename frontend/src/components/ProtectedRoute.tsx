import type React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps{
    requiredRole?:"admin"| "manager"| "employee"
}

export const ProtectedRoute:React.FC<ProtectedRouteProps>= ({requiredRole})=>{
    const token = localStorage.getItem("token")
    const userRole = localStorage.getItem("role")

    if (!token || userRole != requiredRole ) {
        return <Navigate replace={true} to="/login"/>
    }

    return <Outlet/>
}