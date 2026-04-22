"use client";

import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { Priority } from "../../store/todoSlice";
import { useTodoInputs } from "./useTodoInputs";

export default function TodoInput() {
  const { priority, setPriority, text, setText, handleAdd } = useTodoInputs();
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      {/* انتخاب Priority */}
      <Select
        size="small"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        sx={{ minWidth: 110 }}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>

      {/* ورودی متن */}
      <TextField
        fullWidth
        placeholder="Add new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />

      {/* دکمه Add */}
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
}
