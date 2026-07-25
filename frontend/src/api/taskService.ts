import { apiClient } from "./apiClient";
import { type TaskItem } from "../types/taskItem";


export const taskService = {
    getAllTask: async()=>{
        const response = await apiClient.get<{allTask:TaskItem[]}>("/user/all-task")
        return response.data.allTask
    },

    getUserTask : async()=>{
        const response = await apiClient.get<{tasks:TaskItem[]}>("/user/my-task")
        return response.data.tasks
    },

    createTask : async(taskData:{title:string, description:string, assignedTo:string, priority:'low'| 'medium' | 'high'})=>{
        const response = await apiClient.post("/user/add-task",taskData)
        return response.data
    },

    updatePriority : async(id:string,priority:string )=>{
        const response = await apiClient.post(`/user/change-priority/${id}`,{priority})
        return response.data
    },

    changeStatus:async(taskId:string, newStatus: TaskItem["status"])=>{
        const response = await apiClient.post(`/user/change-status/${taskId}`,{status:newStatus})
        return response.data
    },

    deleteTask : async(id:string)=>{
        const response = await apiClient.delete(`/user/delete/${id}`)
        return response.data
    }

}