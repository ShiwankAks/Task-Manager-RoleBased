import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogoutButton from "../components/LogoutButton"
import toast from "react-hot-toast"
import { LoadingSpinner } from "../components/LoadingSpinner"
import type { TaskItem } from "../types/taskItem"
import { taskService } from "../api/taskService"


function AdminDashboard() {

    const navigate = useNavigate()   

    const [task, setTask] = useState<TaskItem[]>([])
    const [title, setTitle] = useState("")
    const [employee, setEmployee] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


    const getAllTask = async () => {
        try {
            const response = await taskService.getAllTask()
            setTask(response)
        } catch (error: any) {
            toast.error(error.response?.data?.message  || "Unable to fetch tasks")
        }finally{
            setIsLoading(false)
        }
    }

    const onSubmitTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (!title || !employee) {
            toast.error("Please fill all the details")
            setIsLoading(false)
            return
        }
        try {
            await taskService.createTask({title,description,assignedTo:employee,priority})
        
        await getAllTask()
        setTitle("")
        setEmployee("")
        setDescription("")
        toast.success("Task Submitted Successfully")
        
        } catch (error:any) {
             toast.error(error.response?.data?.message || "Unable to submit tasks")

        }
        finally{
            setIsSubmitting(false)
        }
    }

    const changePriority = async (id: string, priority: string) => {
        try {
            await taskService.updatePriority(id,priority)
            getAllTask()
            toast.success("Priority changed successfully")
        } catch (error: any) {
            toast.error(error.message  || "Unable to change priority")
        }
    }

    const deleteTask = async (id: string) => {
        const isConfirm = window.confirm("Are you sure you want to delete this task?")
        if(!isConfirm) return;
        try {
            await taskService.deleteTask(id)
            getAllTask()
            toast.success("Task Deleted Successfully")
        } catch (error: any) {
            toast.error(error.response?.data?.message  || "Unable to delete task")
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getAllTask()
    }, [])

    if (isLoading) {
        return(
            <div className="flex h-screen items-center justify-center">
                {<LoadingSpinner size="lg" fullScreen/>}
            </div>
        )
    }
    return (
        <div className=" bg-gray-100 ">
            <div className=" mx-auto p-8 max-w-6xl  ">
                <div className=" flex justify-between mb-8 ">
                    <h1 className=" text-2xl font-bold ">
                        Admin Dashboard
                    </h1>
                    <div onClick={() => navigate("/users")}
                        className=" px-8 ">
                        <button className=" border px-2 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer ml-2 rounded-sm text-white
                 ">
                            Users
                        </button>
                        <LogoutButton />
                    </div>
                </div>
                <form onSubmit={onSubmitTask} className=" border rounded p-5 mb-8 " action="">

                    <h2 className="text-xl font-semibold mb-4">Create Task</h2>
                    <input className="border p-2 w-full mb-3 "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" placeholder="Task Title" />

                    <textarea
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full mb-3 "
                        placeholder="Description" name="" id="">

                    </textarea>
                    <input
                        className="border p-2 w-full mb-3"
                        value={employee} onChange={(e) => setEmployee(e.target.value)} placeholder="Employee Username" type="text" />

                    <select
                        className="border p-2 w-full mb-4 "
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                    disabled={isSubmitting}
                    type="submit" 
                    className=" bg-blue-600 text-white px-5 py-2 rounded max-w-30 cursor-pointer hover:bg-blue-700 ">
                       {isSubmitting?"Creating...":"Create Task"}
                        </button>
                </form>

                <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
                <table className=" w-full border ">
                    <thead>
                        <tr className=" bg-gray-200 ">
                            <th className=" border p-2 ">Title</th>
                            <th className=" border p-2 ">Assigned To</th>
                            <th className=" border p-2 ">Status</th>
                            <th className=" border p-2 ">Priority</th>
                            <th className=" border p-2 ">Change Priority</th>
                            <th className=" border p-2 ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task?.map((data) => {
                            return (
                                <tr key={data._id}>
                                    <td className=" border p-2 ">{data.title}</td>
                                    <td className=" border p-2 ">{data.assignedTo?.username || "no user"}</td>
                                    <td className=" border p-2 ">{data.status}</td>
                                    <td className=" border p-2 ">{data.priority} </td>
                                    <td className=" border p-2 ">
                                        <select
                                            value={data.priority}
                                            onChange={(e) => changePriority(data._id, e.target.value)}
                                            >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </td>
                                    <td className=" border p-2 ">
                                        <button onClick={() => deleteTask(data._id)}
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

export default AdminDashboard
