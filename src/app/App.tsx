import { TaskType, TodolistItem } from "../components/TodolistsItem";
import "./App.css";
import { CreateItemForm } from "../components/CreateItemForm";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from "../model/todolist-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC } from "../model/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";


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

  const dispatch = useDispatch()
  const todolists = useSelector<RootState, TodolistsType[]>(state => state.todolists)
  const tasks = useSelector<RootState, TasksState>(state => state.tasks)


  // const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
  //   { id: todolistID1, title: "Todolist1", filter: "all" },
  //   { id: todolistID2, title: "Todolist2", filter: "all" },
  // ] )

  // const [tasks, dispatchTasks] = useReducer(tasksReducer,{
  //   [todolistID1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistID2]: [
  //     { id: v1(), title: "Rest API", isDone: true },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ],
  // });


  const deleteTasks = (todolistId: string, taskId: string) => {
    dispatch(deleteTasksAC({todolistId,taskId}))
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    const action = changeTodolistFilterAC({id: todolistId, filter: filter})
    dispatch(action)
  };

  const createTasks = (todolistId: string, title: string) => {
    dispatch(createTaskAC({todolistId,title}))
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusAC({todolistId,taskId,isDone}));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatch(changeTaskTitleAC({todolistId,taskId,title}))
  };

  const changeTaskTodolist = (todolistId: string, title: string) => {
    const action = changeTodolistTitleAC({id: todolistId, title: title})
    dispatch(action)
  };

  const createTodolist = (title: string) => {
    const actionCreateTodo = createTodolistAC(title)
    dispatch(actionCreateTodo)
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId))
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
