import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { deleteTodo, toggleTodo } from "../../store/todoSlice";
import { Todo } from "../../types/todo";
import EditTaskModal from "../EditTaskModal";
import { useTodoItems } from "./useTodoItem";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
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

      <Box
        {...attributes}
        {...listeners}
        sx={{
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          mr: 1,
          color: "#999",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DragIndicatorIcon fontSize="small" />
      </Box>

      <Checkbox
        checked={todo.completed}
        onClick={(e) => e.stopPropagation()}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {/* Priority */}
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: getPriorityColor(),
          mr: 1,
        }}
      />

      <Typography sx={{ flex: 1 }}>{todo.text}</Typography>

      <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
