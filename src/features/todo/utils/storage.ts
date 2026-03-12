import { Todo } from "../types/todo";

const STORAGE_KEY = "kanban_todos";

export function loadTodos() {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    return saved.map((t: any) => ({
      priority: t.priority ?? "medium", 
      ...t,
    }));
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {}
}
