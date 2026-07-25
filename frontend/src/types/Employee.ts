export interface Employee {
  _id: string;
  username: string;
  email: string;
  role: "employee" | "manager" | "admin";
}
