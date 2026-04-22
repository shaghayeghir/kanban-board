"use client";

import { Button, ButtonGroup } from "@mui/material";
import { useFilterTabs } from "./useFilterTabs";

export default function FilterTabs() {
  const { handleFilter, filter } = useFilterTabs();
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
