import { Status } from "../store/todoSlice";

export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: Priority;
  notes: string;
  status: Status;
}
