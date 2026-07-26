import React, { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { authService } from "../api/authService"




export const Signup = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const onSubmitHandler =async (e:React.SubmitEvent<HTMLFormElement>)=>{
         e.preventDefault()
         setIsLoading(true)
        try {
            await authService.signup(username, email, password)
            toast.success("Please Login")
            navigate("/login")
        } catch (error:any) {
            toast.error(error.response?.data?.message || "Signup Failed")
        }
        finally{
            setIsLoading(false)
        }
    }

    return <div className="flex min-h-screen justify-center bg-gray-100 ">

        <div className=" flex flex-col justify-center items-center w-full ">
            <form onSubmit={onSubmitHandler} className=" shadow-2xl flex flex-col justify-center items-center bg-white w-[22%] py-4 px-6 ">
                <div className=" text-2xl font-bold text-center w-full mt-4 pb-6  ">
                    <h2 className=" text-center ">
                        Sign Up
                    </h2>
                </div>
                <label className=" text-start w-full px- py-1 "  >Username</label>
                <input className="border px-3 py-2 rounded-sm mb-2 w-full  "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username "
                    type="text" />
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
                <p className=" text-sm w-full text-blue-600 cursor-pointer hover:text-blue-900 mt-1 "
                    onClick={() => navigate("/login")}>
                    Already have an account?
                </p>
                <button type="submit"
                disabled={isLoading}
                    className=" border w-full px-5 py-2 rounded-sm mt-2 text-white bg-blue-600 transition-all hover:bg-blue-700 cursor-pointer  mb-4">
                    {isLoading?"Signing up":"Sign up"}
                </button>
            </form>
        </div>
    </div>

}