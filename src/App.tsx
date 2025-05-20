import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";
export type TodoList = {
  id: string;
  title: string;
  filter: FilterValues;
};

type TaskState = {
  [todolistId: string]: Task[];
};

export const App = () => {
  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, setTodoLists] = useState<TodoList[]>([
    { id: todoListId_1, title: "What to learn", filter: "all" },
    { id: todoListId_2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TaskState>({
    [todoListId_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],

    [todoListId_2]: [
      { id: v1(), title: "BEER", isDone: true },
      { id: v1(), title: "CHEEPS", isDone: true },
      { id: v1(), title: "DRIED FISH", isDone: false },
    ],
  });

  const deleteTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((task) => {
        return task.id !== taskId;
      }),
    });
  };
  //update todolist
  const changeFilter = (filter: FilterValues, todolistId: string) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todolistId ? { ...tl, filter: filter } : tl
      )
    );
  };

  const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.isDone);
      case "completed":
        return tasks.filter((task) => task.isDone);
    }
    return tasks;
  };
  const createTask = (title: string, todolistId: string) => {
    const newTask = { id: v1(), title, isDone: false };
    // const newTasks = [newTask, ...tasks]
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] });
  };

  //delete Todolist
  const deleteTodolist = (todolistId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !==todolistId))
    delete tasks[todolistId]
  }

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id == taskId ? { ...task, isDone } : task
      ),
    });
  };
  // const tasksForTodoList = getFilteredTasks(tasks, filter);
  const todolistComponents = todoLists.map((tl) => {
    return (
      <TodolistItem
        key={tl.id}
        todolistId = {tl.id}
        title={tl.title}
        tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        filter={tl.filter}
        deleteTodolist={deleteTodolist}
      />
    );
  });
  
  return <div className="app">
    {todolistComponents}
    </div>;
};
