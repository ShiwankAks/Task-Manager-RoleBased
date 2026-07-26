import type { Employee } from "../types/Employee"
import { apiClient } from "./apiClient"


export const userService = {
    getUsers: async()=>{
        const response = await apiClient.get("/user/all-users")
        return response.data.data
    },
    deleteUser : async(userId:string)=>{
        const response = await apiClient.delete(`/user/delete-user/${userId}`)
        return response.data
    },
    changeUserRole: async(userId:string ,newRole: Employee["role"])=>{
        const response = await apiClient.post(`/user/change-role/${userId}`,{role:newRole})
        return response.data
    }
}