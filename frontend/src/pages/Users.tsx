import { useNavigate } from "react-router-dom"
import LogoutButton from "../components/LogoutButton"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LoadingSpinner } from "../components/LoadingSpinner"
import type { Employee } from "../types/Employee"
import { userService } from "../api/userService"



export const Users = () => {

    const navigate = useNavigate()
    const [employees, setEmployees] = useState<Employee[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getEmployees = async () => {
        setIsLoading(true)
        try {
            const response = await userService.getUsers()
            setEmployees(response)

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Unable to fetch User list")
        } finally {
            setIsLoading(false)
        }

    }

    const deleteEmployee = async (userId: string) => {
        const isConfirm = window.confirm("Are you sure you want to delete this user?")
        if (!isConfirm) return;
        try {
            await userService.deleteUser(userId)
            getEmployees()
            toast.success("Employee deleted successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message|| "Unable to delete User")
        }
    }

    const changeRole = async (userId: string, newRole: Employee["role"]) => {
        try {
            await userService.changeUserRole(userId,newRole)
            getEmployees()
            toast.success("Employee role changed successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message|| "Could not change employee role")
        }
    }

    useEffect(() => {
        getEmployees()
        const role = localStorage.getItem("role")
        if (role != "admin") {
            setIsLoading(false)
            toast.error("Please Login")
            navigate("/")
            return
        }
    }, [])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                {<LoadingSpinner size="lg" fullScreen />}
            </div>
        )
    }
    return (
        <div className=" bg-gray-100 ">
            <div className=" mx-auto p-8 max-w-6xl  ">
                <div className=" flex justify-between mb-8 ">
                    <h1 className=" text-2xl font-bold ">
                        Employee List
                    </h1>
                    <div onClick={() => navigate("/admin-dashboard")}
                        className=" px-8 ">
                        <button className=" border px-2 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer ml-2 rounded-sm text-white
                 ">
                            Dashboard
                        </button>
                        <LogoutButton />

                    </div>
                </div>

                <table className=" w-full border ">
                    <thead>
                        <tr className=" bg-gray-200 ">
                            <th className=" border p-2 ">Name</th>
                            <th className=" border p-2 ">Email</th>
                            <th className=" border p-2 ">Role</th>
                            <th className=" border p-2 ">Change Role</th>
                            <th className=" border p-2 ">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map((data: Employee) => {
                            return (
                                <tr key={data._id}>

                                    <td className=" border p-2 ">{data.username}</td>
                                    <td className=" border p-2 ">{data.email}</td>
                                    <td className=" border p-2 ">{data.role}</td>
                                    <td className=" border p-2 ">
                                        <select
                                            value={data.role}
                                            onChange={(e) => changeRole(data._id, e.target.value as Employee["role"])}
                                        >
                                            <option value="employee">Employee</option>
                                            <option value="manager">Manager</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className=" border p-2 ">
                                        <button onClick={() => deleteEmployee(data._id)}
                                            className=" border px-2 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer ml-2 rounded-sm text-white">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}