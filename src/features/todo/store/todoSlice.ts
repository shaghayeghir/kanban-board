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
      action: PayloadAction<{ text: string; priority: Priority; notes: string }>
    ) => {
      state.todos.push({
        id: nanoid(),
        text: action.payload.text,
        notes: action.payload.notes,
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
} = todoSlice.actions;
export default todoSlice.reducer;
