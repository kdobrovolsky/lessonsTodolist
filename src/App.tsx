import { v1 } from "uuid";
import { TaskType, TodolistItem } from "./components/TodolistsItem";
import { useReducer, useState } from "react";
import "./App.css";
import { CreateItemForm } from "./components/CreateItemForm";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from "./model/todolist-reducer";

export type FilterValues = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksState = {
  [key: string]: TaskType[]
}

export const App = () => {
  const todolistID1 = v1();
  const todolistID2 = v1();

  // const [todolists, setTodolists] = useState<TodolistsType[]>([
  //   { id: todolistID1, title: "Todolist1", filter: "all" },
  //   { id: todolistID2, title: "Todolist2", filter: "all" },
  // ]);

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
    { id: todolistID1, title: "Todolist1", filter: "all" },
    { id: todolistID2, title: "Todolist2", filter: "all" },
  ] )

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

  const deleteTasks = (todolistId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    const action = changeTodolistFilterAC({id: todolistId, filter: filter})
    dispatchToTodolists(action)
  };

  const createTasks = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone } : t
      ),
    });
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, title: title } : t
      ),
    });
  };

  const changeTaskTodolist = (todolistId: string, title: string) => {
    const action = changeTodolistTitleAC({id: todolistId, title: title})
    dispatchToTodolists(action)
  };

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)
   dispatchToTodolists(action)
    setTasks({ ...tasks, [action.payload.id]: [] });
  };

  const deleteTodolist = (todolistId: string) => {
    dispatchToTodolists(deleteTodolistAC(todolistId))
    delete tasks[todolistId]
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        <CreateItemForm addTask={createTodolist} />
      </Grid>
      <Grid container spacing={2}>
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
            <Grid key={todolist.id}>
              <TodolistItem
                id={todolist.id}
                title={todolist.title}
                filter={todolist.filter}
                tasks={changeFilterTasks()}
                deleteTasks={deleteTasks}
                changeFilter={changeFilter}
                createTasks={createTasks}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTaskTodolist={changeTaskTodolist}
                deleteTodolist={deleteTodolist}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
