import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { deleteTodo, toggleTodo } from "../../store/todoSlice";
import { Todo } from "../../types/todo";
import EditTaskModal from "../EditTaskModal";
import { useTodoItems } from "./useTodoItem";
export default function TodoItem({ todo }: { todo: Todo }) {
  const {
    setNodeRef,
    style,
    attributes,
    listeners,
    setOpen,
    open,
    dispatch,
    getPriorityColor,
  } = useTodoItems({ todo });
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
