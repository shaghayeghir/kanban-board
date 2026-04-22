import { useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Todo } from "../../types/todo";
import { CSS } from "@dnd-kit/utilities";
export const useTodoItems = ({ todo }: { todo: Todo }) => {
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
  return {
    setNodeRef,
    style,
    attributes,
    listeners,
    setOpen,
    open,
    dispatch,
    getPriorityColor,
  };
};
