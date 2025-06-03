import { type ChangeEvent } from "react";
import type { FilterValues, Task } from "./App";
// import { Button } from './Button';
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { IconButton, List, ListItem } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff"; // Правильный импорт

type Props = {
  todolistId: string;
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValues, todolistId: string) => void;
  createTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilterValues;
  deleteTodolist: (todolistId: string) => void;
  changeTodoListTitle: (newTitle: string, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    todolistId,
    title,
    changeFilter,
    createTask,
    filter,
    deleteTodolist,
    deleteTask,
    changeTaskStatus,
    changeTodoListTitle,
    changeTaskTitle,
  } = props;

  const createTaskHandler = (taskTitle: string) => {
    createTask(taskTitle, todolistId);
  };
  const changeTodolistTitleHandler = (newTitle: string) => {
    changeTodoListTitle(newTitle, todolistId);
  };
  return (
    <div>
      <h3>
        <EditableSpan changeTitle={changeTodolistTitleHandler} title={title} />

        <IconButton
          size="small"
          onClick={() => deleteTodolist(todolistId)}
          aria-label="delete"
        >
          <HighlightOffIcon fontSize="small" />
        </IconButton>
      </h3>

      <CreateItemForm createItem={createTaskHandler} />
      {props.tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {props.tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id, todolistId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistId);
            };
            const changeTodoListTitleHandler = (newTitle: string) => {
              changeTaskTitle(task.id, newTitle, todolistId);
            };
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                {/* <span>{task.title}</span> */}
                <EditableSpan
                  changeTitle={changeTodoListTitleHandler}
                  title={task.title}
                />
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </List>
      )}
      <div>
        <ButtonGroup size="small" variant="contained" disableElevation>
          <Button
            color={filter === "all" ? "secondary" : "primary"}
            onClick={() => changeFilter("all", todolistId)}
          >
            All
          </Button>

          <Button
            color={filter === "active" ? "secondary" : "primary"}
            onClick={() => changeFilter("active", todolistId)}
          >
            Active
          </Button>

          <Button
            color={filter === "completed" ? "secondary" : "primary"}
            onClick={() => changeFilter("completed", todolistId)}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
