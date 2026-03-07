import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import { loadTodos } from "../utils/storage";

export type Filter = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: Filter;
}
export type Priority = "low" | "medium" | "high";
const initialState: TodoState = {
  todos: loadTodos(),
  filter: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; priority: Priority }>
    ) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
        createdAt: Date.now(),
      });
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    setPriority: (
      state,
      action: PayloadAction<{ id: string; priority: Priority }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) todo.priority = action.payload.priority;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, setPriority } =
  todoSlice.actions;
export default todoSlice.reducer;
