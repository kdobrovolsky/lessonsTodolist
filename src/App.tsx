import { v1 } from "uuid";
import { TodolistItem } from "./components/TodolistsItem";
import { useState } from "react";
import "./App.css";

export type FilterValues = "all" | "active" | "completed";

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValues
}

export const App = () => {

  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistID1, title: "Todolist1", filter: "all" },
    { id: todolistID2, title: "Todolist2", filter: "all" },
  ]);

  const [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Redux2", isDone: false },
    ],
  });

  const deleteTasks = (todolistId: string,taskId: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=> t.id !== taskId)})
  };

  const changeFilter = (todolistId:string,filter: FilterValues) => {
    setTodolists(prev=> prev.map(t=> t.id === todolistId ? {...t, filter}:t))
  };

  const createTasks = (todolistId: string,title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]});
  };

  const changeTaskStatus = (todolistId: string,taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t=> t.id === taskId? {...t, isDone}: t)})
  };

  return (
    <div>
      {todolists.map((todolist) => {
        
        const changeFilterTasks = () => {
          const filteredTasks = tasks[todolist.id];
          switch (todolist.filter) {
            case "active":
              return filteredTasks.filter((t) => !t.isDone);
            case "completed":
              return filteredTasks.filter((t) => t.isDone);
            default:
              return filteredTasks;
          }
        };

        return (
          <TodolistItem
            id = {todolist.id}
            key={todolist.id}
            title= {todolist.title}
            filter={todolist.filter}
            tasks={changeFilterTasks()}
            deleteTasks={deleteTasks}
            changeFilter={changeFilter}
            createTasks={createTasks}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
};
