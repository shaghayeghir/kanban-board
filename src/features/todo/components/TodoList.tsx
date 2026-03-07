"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleTodo, deleteTodo } from "../store/todoSlice";
import { List, ListItem, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../store/hooks";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();
const filter = useAppSelector((state) => state.todo.filter);

const filteredTodos = todos.filter((t) => {
  if (filter === "active") return !t.completed;
  if (filter === "completed") return t.completed;
  return true; // all
});
  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />

          {todo.text}
        </ListItem>
      ))}
    </List>
  );
}
