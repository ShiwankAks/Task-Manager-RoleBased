import { jwtDecode } from "jwt-decode"
import React, { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../components/LoadingSpinner";
import { authService } from "../api/authService";

interface JwtPayload {
    id: string,
    role: 'admin' | 'manager' | 'employee';
    iat: number,
    exp: number
}


export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [error, setError] = useState("")

    const navigate = useNavigate()
    const onSubmitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await authService.login(email,password)
            const { token, message } = response.data

            const decoded = jwtDecode<JwtPayload>(token)
            localStorage.setItem("token", token)
            localStorage.setItem("role", decoded.role)
            localStorage.setItem("userId", decoded.id)


            if (decoded.role == "admin") {
                navigate("/admin-dashboard")
            } else if (decoded.role == "manager") {
                navigate("/manager-dashboard")
            } else if (decoded.role == "employee") {
                navigate("/user-dashboard")
            }

            toast.success(message)
        } catch (error: any) {
            toast.error(error.response?.data?.message || "login failed")
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                {<LoadingSpinner size="lg" fullScreen />}
            </div>
        )
    }

    return (
        <div className="flex min-h-screen justify-center bg-gray-100 ">

            <div className=" flex flex-col justify-center items-center w-full ">
                <form onSubmit={onSubmitHandler}
                    className=" shadow-2xl flex flex-col justify-center items-center bg-white w-[22%] py-4 px-6 ">
                    <div className=" text-2xl font-bold text-center w-full mt-4 pb-6  ">
                        <h2 className=" text-center ">
                            Log In
                        </h2>
                    </div>
                    <label className=" text-start w-full px- py-1 "  >Email</label>
                    <input className="border px-3 py-2 rounded-sm mb-2 w-full  "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email "
                        type="text" />
                    <label className=" text-start w-full px- py-1 "  >Password</label>

                    <input className=" border px-3 py-2 rounded-sm w-full " placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" />
                    <p className=" text-sm w-full text-blue-600 cursor-pointer hover:text-blue-900 mt-1 " onClick={() => navigate("/signup")}>
                        New user?
                    </p>
                    <button
                        type="submit"
                        className=" border w-full px-5 py-2 rounded-sm mt-2 text-white bg-blue-600 transition-all hover:bg-blue-700 cursor-pointer  mb-4">
                        Log In
                    </button>
                </form>
            </div>
        </div>

    )
}