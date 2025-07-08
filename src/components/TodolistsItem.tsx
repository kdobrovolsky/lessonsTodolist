import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValues } from "../App";
import { Button } from "./ui/Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  title: string;
  tasks: TaskType[];
  filter: FilterValues;
  deleteTasks: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTasks: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  filter,
  deleteTasks,
  changeFilter,
  createTasks,
  changeTaskStatus,
}: TodolistItemPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    setError(null);
  };

  const onCreateNewTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      createTasks(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is requared");
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskTitle.trim() !== "") {
      createTasks(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is requared");
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button title="+" onClick={onCreateNewTaskHandler} />
        {error ? <div className="error-message">{error}</div> : ""}
      </div>
      <ul>
        {tasks.map((task) => {
          const deleteTasksHandler = () => {
            deleteTasks(task.id);
          };

          const changeTaskStatusHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            changeTaskStatus(task.id, e.currentTarget.checked);
          };

          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />{" "}
              <span>{task.title}</span>
              <Button title="X" onClick={deleteTasksHandler} />
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title="All"
          onClick={() => changeFilter("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title="Active"
          onClick={() => changeFilter("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title="Completed"
          onClick={() => changeFilter("completed")}
        />
      </div>
    </div>
  );
};
