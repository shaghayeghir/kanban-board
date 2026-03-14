"use client";

import FilterTabs from "@/features/todo/components/filterTabs/FilterTabs";
import TodoColumn from "@/features/todo/components/TodoColumn";
import TodoInput from "@/features/todo/components/todoInputs/TodoInput";
import { useAppDispatch, useAppSelector } from "@/features/todo/store/hooks";
import { Todo } from "@/features/todo/types/todo";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Typography } from "@mui/material";
import { reorderColumns, setStatus,Status } from "@/features/todo/store/todoSlice";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { todo } from "node:test";
export default function Page() {
  const dispatch = useAppDispatch();
  const { todos, columns } = useAppSelector((state) => state.todo);

function getColumnTitle(status: Status): string {
  switch (status) {
    case "todo":
      return "Todo";
    case "in-progress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return "";
  }
}
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    // ✅ اگر ستون درگ شده
    if (columns.includes(active.id as Status)) {
      const oldIndex = columns.indexOf(active.id as Status);
      const newIndex = columns.indexOf(over.id as Status);

      const newOrder = arrayMove(columns, oldIndex, newIndex);
      dispatch(reorderColumns(newOrder));
      return;
    }

    // ✅ اگر تسک بین ستون‌ها جابجا شد
    if (columns.includes(over.id as Status)) {
      dispatch(
        setStatus({
          id: active.id as string,
          status: over.id as Status,
        })
      );
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext
        items={columns}
        strategy={horizontalListSortingStrategy}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            padding: 20,
          }}
        >
          {columns.map((column: Status) => {
            const items = todos.filter(
              (t: Todo) => t.status === column
            );

            return (
              <TodoColumn
                key={column}
                id={column}
                status={column}
                title={getColumnTitle(column)}
                items={items}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}


