import { useEffect, useState } from "react"
import LogoutButton from "../components/LogoutButton"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { taskService } from "../api/taskService"
import type { TaskItem } from "../types/taskItem"


function UserDashboard() {

  const [task, setTask] = useState<TaskItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const getUserTask = async () => {
    setIsLoading(true)
    try {
      const response = await taskService.getUserTask()
      setTask(response)

    } catch (error: any) {
      navigate("/login")
      toast.error(error.response?.data?.message || error.message || "Failed to load tasks")
    }
    finally {
      setIsLoading(false)
    }
  }

  const changeStatus = async (taskId: string, newStatus: TaskItem["status"]) => {
    try {
      await taskService.changeStatus(taskId,newStatus)
      getUserTask()
      toast.success("Status Updated")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserTask()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {<LoadingSpinner size="lg" fullScreen />}
      </div>
    )
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto   h-screen p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Employee Dashboard</h1>
          <LogoutButton />
        </div>
        {
          task.length == 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <h1 className="text-2xl font-semibold text-gray-500">No Tasks Assigned Yet</h1>
              <p className="text-gray-400 mt-2">When an admin assigns tasks to you, they will appear here.</p>
            </div>
          ) : (task.map((data) => {
            return (
              <div className="grid gap-5 p-5">
                <div key={data._id} className="border rounded-lg p-5 bg-gray-200 shadow">
                  <h2 className="text-xl font-bold">{data.title}</h2>
                  <p className="mt-2">{data.description}</p>
                  <p className=" mt-4 ">
                    <strong>Status: </strong>
                    {data.status}
                  </p>
                  <p className=" mt-4 ">
                    <strong>Priority: </strong>
                    {data.priority}
                  </p>
                  <div className=" mt-5 ">
                    <select value={data.status} onChange={(e) => changeStatus(data._id, e.target.value as TaskItem["status"])} className="border p-2 rounded">
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            )
          }))}

      </div>
    </div>

  )
}

export default UserDashboard
