import { v1 } from "uuid";
import { TodolistItem } from "./components/TodolistsItem";
import { useState } from "react";
import "./App.css";

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValues>("all");

  const deleteTasks = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const changeFilterTasks = () => {
    const filteredTasks = tasks;
    switch (filter) {
      case "active":
        return filteredTasks.filter((t) => !t.isDone);
      case "completed":
        return filteredTasks.filter((t) => t.isDone);
      default:
        return filteredTasks;
    }
  };

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };

  const createTasks = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map((t) => (t.id === taskId ? { ...t, isDone } : t));
    setTasks(newState);
  };

  return (
    <TodolistItem
      title="Todolist1"
      filter={filter}
      tasks={changeFilterTasks()}
      deleteTasks={deleteTasks}
      changeFilter={changeFilter}
      createTasks={createTasks}
      changeTaskStatus={changeTaskStatus}
    />
  );
};
