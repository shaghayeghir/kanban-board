"use client";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter } from "@/features/todo/store/todoSlice";
import { Button, ButtonGroup } from "@mui/material";

export default function FilterTabs() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.todo.filter);

  const handleFilter = (f: "all" | "active" | "completed") => {
    dispatch(setFilter(f));
  };

  return (
    <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
      <Button
        onClick={() => handleFilter("all")}
        variant={filter === "all" ? "contained" : "outlined"}
      >
        همه
      </Button>

      <Button
        onClick={() => handleFilter("active")}
        variant={filter === "active" ? "contained" : "outlined"}
      >
        فعال
      </Button>

      <Button
        onClick={() => handleFilter("completed")}
        variant={filter === "completed" ? "contained" : "outlined"}
      >
        انجام‌شده
      </Button>
    </ButtonGroup>
  );
}
