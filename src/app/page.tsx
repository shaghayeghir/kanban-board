import FilterTabs from "@/features/todo/components/FilterTabs";
import TodoInput from "@/features/todo/components/TodoInput";
import TodoList from "@/features/todo/components/todoList/TodoList";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <FilterTabs />
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <TodoInput />

      <TodoList />
    </>
  );
}
