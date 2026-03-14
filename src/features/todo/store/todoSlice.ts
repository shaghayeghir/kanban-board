import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import { loadTodos, saveTodos } from "../utils/storage";

export type Filter = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: Filter;
}
export type Priority = "low" | "medium" | "high";

export type Status = "todo" | "in-progress" | "done";
export interface TodosState {
  todos: Todo[];
  filter: Filter;
  columns: Status[]; // 👈 ترتیب ستون‌ها
}
const initialState: TodosState = {
  todos: loadTodos(),
  filter: "all",
  columns: ["todo", "in-progress", "done"],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; priority: Priority; notes: string }>
    ) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload.text,
        notes: action.payload.notes,
        priority: action.payload.priority,
        completed: false,
        createdAt: Date.now(),
        status: "todo",
      });
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Todo> }>
    ) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);

      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload.changes,
        };
      }
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ activeId: string; overId: string }>
    ) => {
      const { activeId, overId } = action.payload;

      const oldIndex = state.todos.findIndex((t) => t.id === activeId);
      const newIndex = state.todos.findIndex((t) => t.id === overId);

      const item = state.todos.splice(oldIndex, 1)[0];
      state.todos.splice(newIndex, 0, item);
    },
    setStatus(state, action: PayloadAction<{ id: string; status: Status }>) {
      const t = state.todos.find((x) => x.id === action.payload.id);
      if (t) {
        t.status = action.payload.status;
        saveTodos(state.todos);
      }
    },
    reorderColumns(state, action: PayloadAction<Status[]>) {
      state.columns = action.payload;
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

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  setPriority,
  updateTodo,
  reorderTodos,
  setStatus,
  reorderColumns
} = todoSlice.actions;
export default todoSlice.reducer;
