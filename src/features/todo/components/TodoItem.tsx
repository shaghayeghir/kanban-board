import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../store/hooks";
import { toggleTodo, deleteTodo } from "../store/todoSlice";
import { Todo } from "../types/todo";
import EditTaskModal from "./EditTaskModal";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const getPriorityColor = () => {
    switch (todo.priority) {
      case "high":
        return "#ff6b6b"; // red
      case "medium":
        return "#ffa94d"; // orange
      case "low":
        return "#51cf66"; // green
      default:
        return "#ccc";
    }
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        setOpen(true);
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        borderRadius: 2,
        backgroundColor: "#fff",
        mb: 1,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <EditTaskModal open={open} onClose={() => setOpen(false)} todo={todo} />
      <Checkbox
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Priority Dot */}
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: getPriorityColor(),
          mr: 1,
        }}
      />

      {/* متن تسک */}
      <Typography
        sx={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#999" : "#333",
        }}
      >
        {todo.text}
      </Typography>

      <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
