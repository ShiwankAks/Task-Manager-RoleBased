import { useEffect, useState } from "react"
import LogoutButton from "../components/LogoutButton"
import toast from "react-hot-toast"
import { LoadingSpinner } from "../components/LoadingSpinner"
import type { TaskItem } from "../types/taskItem"
import { taskService } from "../api/taskService"


function ManagerDashboard() {

  const [task, setTask] = useState<TaskItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getTask = async () => {
    setIsLoading(true)
    try {
      const response = await taskService.getAllTask()
      setTask(response)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed To Fetch Task")
    } finally {
      setIsLoading(false)
    }
  }

  const changePriority = async (id: string, priority: string) => {
    try {
      await taskService.updatePriority(id,priority)
      getTask()
      toast.success("Priority Updated")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed To Change Priority")
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        {<LoadingSpinner size="lg" fullScreen />}
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
        <LogoutButton />
      </div>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Title</th>
            <th className="border p-3">Description</th>
            <th className="border p-3">Assigned To</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Priority</th>
            <th className="border p-3">Change Priority</th>
          </tr>
        </thead>
        <tbody>
          {task && task.map((data) => {
            return (<tr key={data._id}>
              <td className=" border p-3 ">{data.title}</td>
              <td className=" border p-3 ">{data.description}</td>
              <td className=" border p-3 ">{data.assignedTo.username}</td>
              <td className=" border p-3 ">{data.status}</td>
              <td className=" border p-3 ">{data.priority}</td>
              <td className="border p-3">
                <select value={data.priority}
                  onChange={(e) => changePriority(data._id, e.target.value)} >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
            </tr>)
          })}

        </tbody>
      </table>
    </div>
  )
}

export default ManagerDashboard
