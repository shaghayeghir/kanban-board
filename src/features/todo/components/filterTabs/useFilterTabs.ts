import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setFilter } from "../../store/todoSlice";

export const useFilterTabs = () => {
  const filter = useAppSelector((state) => state.todo.filter);
  const dispatch = useAppDispatch();
  const handleFilter = (f: "all" | "active" | "completed") => {
    dispatch(setFilter(f));
  };

  return {
    handleFilter,
    filter,
  };
};
