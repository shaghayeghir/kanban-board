import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import { saveTodos } from "../utils/storage";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveTodos(state.todo.todos);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
