import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTodo } from "../../store/todoSlice";
import { Priority } from "../../types/todo";

export const useTodoInputs = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (!text.trim()) return;

    dispatch(addTodo({ text, priority, notes }));

    setText("");
    setNotes("");
    setPriority("medium");
  };

  return {
    priority,
    setPriority,
    text,
    setText,
    handleAdd,
  };
};
