"use client";
import { Status } from "../store/todoSlice";
import { Todo } from "../types/todo";
import TodoItem from "./todoItem/TodoItem";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: Status;
  title: string;
  items: Todo[];
  status: Status;
}

export default function TodoColumn({
  id,
  title,
  items,
}: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: "#f4f4f4",
        borderRadius: 8,
        padding: 16,
        width: 300,
        minHeight: 400,
      }}
    >
      {/* ✅ Drag Handle ستون */}
      <div
        {...attributes}
        {...listeners}
        style={{
          fontWeight: 600,
          marginBottom: 16,
          cursor: "grab",
        }}
      >
        {title}
      </div>

      <SortableContext
        items={items.map((i: Todo) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </SortableContext>
    </div>
  );
}
