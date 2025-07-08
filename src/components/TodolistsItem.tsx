import { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import { FilterValues } from "../App";

import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValues;
  deleteTasks: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  deleteTodolist: (todolistId: string) => void;
  createTasks: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTaskTodolist: (taskId: string, title: string) => void;
};

export const TodolistItem = ({
  title,
  id,
  tasks,
  filter,
  deleteTasks,
  changeFilter,
  createTasks,
  changeTaskStatus,
  changeTaskTitle,
  deleteTodolist,
  changeTaskTodolist,
}: TodolistItemPropsType) => {
  const createTasksHandler = (title: string) => {
    createTasks(id, title);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTaskTodolist(id, title);
  };

  return (
    <div>
      <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
      <Tooltip title="Delete" onClick={() => deleteTodolist(id)}>
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>

      <CreateItemForm addTask={createTasksHandler} />
      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTasksHandler = () => {
              deleteTasks(id, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              changeTaskStatus(id, task.id, e.currentTarget.checked);
            };

            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title);
            };

            return (
              <li key={task.id}>
                <Checkbox
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />

                <EditableSpan
                  title={task.title}
                  onChange={changeTaskTitleHandler}
                />
                <Tooltip title="Delete" onClick={deleteTasksHandler}>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => changeFilter(id, "all")}
          variant="outlined"
        >
          All
        </Button>
        <Button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => changeFilter(id, "active")}
          variant="outlined"
        >
          Active
        </Button>
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => changeFilter(id, "completed")}
          variant="outlined"
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
