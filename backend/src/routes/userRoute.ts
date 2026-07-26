import express from 'express'
import verifyToken from '../middlewares/authMiddleware'
import authorizeRole from '../middlewares/roleMiddleware'
import { 
    addTask, 
    changePriority, 
    changeStatus, 
    changeUserRole, 
    deleteTask, 
    deleteUser, 
    getAllTask, 
    getUsers, 
    getUserTask
 } from '../controllers/userController'


const userRouter = express.Router()

// Only Admin
userRouter.post("/add-task",verifyToken,authorizeRole("admin"),addTask)
userRouter.delete("/delete/:id",verifyToken,authorizeRole("admin"),deleteTask)
userRouter.delete("/delete-user/:userId",verifyToken,authorizeRole("admin"),deleteUser)
userRouter.patch("/change-role/:userId",verifyToken,authorizeRole("admin"),changeUserRole)

//  Admin and manager
userRouter.get("/all-task",verifyToken,authorizeRole("admin","manager"), getAllTask)
userRouter.get("/all-users",verifyToken,authorizeRole("admin","manager"),getUsers)
userRouter.patch("/change-priority/:id",verifyToken,authorizeRole("admin","manager"),changePriority)

//  User Task
userRouter.get("/my-task",verifyToken,authorizeRole("employee"),getUserTask)
userRouter.patch("/change-status/:taskId",verifyToken,authorizeRole("employee"),changeStatus)

export default userRouter