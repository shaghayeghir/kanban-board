import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { reorderTodos } from "../../store/todoSlice";

export const useTodoList = () => {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      dispatch(
        reorderTodos({
          activeId: active.id,
          overId: over.id,
        })
      );
    }
  };

  return {
    handleDragEnd,
    todos,
  };
};
