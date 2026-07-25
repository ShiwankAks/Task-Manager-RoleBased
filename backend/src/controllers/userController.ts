import type { Request, Response } from "express";
import Task from "../models/taskModel";
import { User } from "../models/userModel";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching task " + error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Could not find user " });
    }

    return res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting User " + error,
    });
  }
};

const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        role: role,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User role Updated Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while changing User role " + error,
    });
  }
};

const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, assignedTo } = req.body;
    if (!title || !description || !priority || !assignedTo) {
      return res.status(400).json({message:"Please fill all the details"})
    }
    const assignedUser = await User.findOne({ username: assignedTo });
    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    const currentUser = req.user;

    if (!currentUser?.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const newTask = new Task({
      title,
      description,
      status: "pending",
      priority,
      assignedTo: assignedUser._id,
      createdBy: currentUser.id,
    });
    const task = await newTask.save();
    return res
      .status(201)
      .json({ success: true, message: "New Task Created ", task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while adding task " + error,
    });
  }
};

const getAllTask = async (req: Request, res: Response) => {
  try {
    const allTask = await Task.find({})
      .populate("assignedTo", "username")
      .populate("createdBy", "username");
    return res.status(200).json({ success: true, allTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching task " + error,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting task " + error,
    });
  }
};

const changePriority = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    const task = await Task.findByIdAndUpdate(id, { priority }, { new: true });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Priority changed", task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating task " + error,
    });
  }
};

const getUserTask = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const tasks = await Task.find({ assignedTo: user?.id });
    // if (tasks.length == 0) {
    //   return res.status(200).json({message:"User has no pending task"})
    // }
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user task " + error,
    });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true },
    );
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user task " + error,
    });
  }
};

export {
  addTask,
  deleteTask,
  changePriority,
  changeStatus,
  getAllTask,
  getUserTask,
  getUsers,
  deleteUser,
  changeUserRole,
};
