"use client";

import { useState } from "react";
import { TextField, Button, Box, Select, MenuItem } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { addTodo, Priority } from "../store/todoSlice";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (!text.trim()) return;

    dispatch(addTodo({ text, priority, notes }));

    setText("");
    setPriority("medium");
  };

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
