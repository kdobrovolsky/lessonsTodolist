import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValues } from "../App";
import { Button } from "./ui/Button";
import { CreateItemForm } from "./CreateItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  id: string
    title: string;
  tasks: TaskType[];
  filter: FilterValues;
  deleteTasks: (todolistId: string,taskId: string) => void;
  changeFilter: (todolistId: string,filter: FilterValues) => void;
  createTasks: (todolistId: string,title: string) => void;
  changeTaskStatus: (todolistId: string,taskId: string, isDone: boolean) => void;
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
}: TodolistItemPropsType) => {

    const createTasksHandler = (title: string) => {
        createTasks(id, title)
    }

  return (
    <div>
      <h3>{title}</h3>
      
     <CreateItemForm addTask={createTasksHandler}/>
      <ul>
        {tasks.map((task) => {
          const deleteTasksHandler = () => {
            deleteTasks(id,task.id);
          };

          const changeTaskStatusHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => {
            changeTaskStatus(id,task.id, e.currentTarget.checked);
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
          onClick={() => changeFilter(id,"all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title="Active"
          onClick={() => changeFilter(id,"active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title="Completed"
          onClick={() => changeFilter(id,"completed")}
        />
      </div>
    </div>
  );
};
