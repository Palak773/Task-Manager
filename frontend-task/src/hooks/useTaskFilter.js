import { useState, useMemo } from "react";

export function useTaskFilter(tasks) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "open"
          ? task.status === "open"
          : filter === "in-progress"
          ? task.status === "in-progress"
          : filter === "done"
          ? task.status === "done"
          : true;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, filter, search]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      open: tasks.filter((t) => t.status === "open").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    };
  }, [tasks]);

  return {
    filter,
    setFilter,
    search,
    setSearch,
    filtered,
    stats,
  };
}