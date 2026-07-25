export interface TaskItem {
  _id: string;
  title: string;
  description: string;
  assignedTo: {
    _id: string;
    username: string;
  };
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}
