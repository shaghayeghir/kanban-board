"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { Todo} from "../types/todo";
import { updateTodo } from "../store/todoSlice";

export default function EditTaskModal({
  open,
  onClose,
  todo,
}: {
  open: boolean;
  onClose: () => void;
  todo: Todo;
}) {
  const dispatch = useAppDispatch();

  const [text, setText] = useState(todo.text);
  const [priority, setPriority] = useState(todo.priority);
  const [notes, setNotes] = useState(todo.notes || "");

  const handleSave = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        changes: { text, priority, notes },
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>ویرایش تسک</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="متن تسک"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <TextField
            select
            label="اولویت"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
          >
            <MenuItem value="low">کم</MenuItem>
            <MenuItem value="medium">متوسط</MenuItem>
            <MenuItem value="high">زیاد</MenuItem>
          </TextField>

          <TextField
            label="توضیحات"
            fullWidth
            multiline
            minRows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>لغو</Button>
        <Button variant="contained" onClick={handleSave}>
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>
  );
}
