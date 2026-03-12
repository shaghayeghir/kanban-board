"use client"

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { reorderTodos } from "../store/todoSlice";
import TodoItem from "./TodoItem";

export default function TodoList() {

  const todos = useAppSelector(state => state.todo.todos);
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: any) => {

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {

      dispatch(
        reorderTodos({
          activeId: active.id,
          overId: over.id
        })
      );

    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >

      <SortableContext
        items={todos.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >

        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo}/>
        ))}

      </SortableContext>

    </DndContext>
  );
}
