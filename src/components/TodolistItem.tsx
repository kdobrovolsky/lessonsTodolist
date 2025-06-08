import { KeyboardEvent,ChangeEvent, useState } from 'react';
import { FilterValues } from '../App';
import { Button } from './Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    deleteTasks: (taskId: string) => void
    changeFilter: (changeFilter: FilterValues) => void
    createTasks: (title: string) => void
}

export const TodolistItem = ({title, tasks,deleteTasks,changeFilter,createTasks}:TodolistItemPropsType) => {
    const [taskTitle, newTaskTile] = useState('')
    
    const changeTaskTitleHandler  = (e:ChangeEvent<HTMLInputElement>) => {
       newTaskTile(e.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        createTasks(taskTitle.trim())
        newTaskTile('')
    }

    const createTaskOnEnterHandler  = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            createTasks(taskTitle.trim())
            newTaskTile('')
        }
    }

    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler }/>
          <Button title={"+"} onClick={onClickButtonHandler}/>
        </div>
        {tasks.length === 0 
        ?(<p>No tasks</p>)
        :(
        <ul>
            {tasks.map(task => {
                const deleteTasksHandler = () => {
                    deleteTasks(task.id)
                }
                return(
                    <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                    <Button title='X' onClick={deleteTasksHandler}/>
                  </li>
                )
            })}
        </ul>
        )}
        <div>
        <Button title={"All"} onClick={()=>changeFilter('all')}/>
        <Button title={"Active"} onClick={()=>changeFilter('active')}/>
        <Button title={"Completed"} onClick={()=>changeFilter('completed')}/>
        </div>
      </div>
  )
}
