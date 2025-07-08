import { ChangeEvent} from "react";
import { FilterValues } from "../App";
import { Button } from "./ui/Button";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";

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
  changeTaskTitle: (todolistId: string,taskId: string, title: string) => void
  changeTaskTodolist: (taskId: string, title: string) => void
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
  changeTaskTodolist,
}: TodolistItemPropsType) => {

    const createTasksHandler = (title: string) => {
        createTasks(id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTaskTodolist(id, title)
    }

  return (
    <div>
      <EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
      
     <CreateItemForm addTask={createTasksHandler}/>
    {tasks.length === 0 
    ?(<p>No Tasks</p>)
    :(
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

          const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(id,task.id, title)
          };

          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
              />
              
              <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>

              <Button title="X" onClick={deleteTasksHandler} />
            </li>
          );
        })}
      </ul>
    )}

      
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
