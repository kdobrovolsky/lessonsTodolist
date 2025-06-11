import {ChangeEvent} from 'react';
import { FilterValues } from '../App';
import { Button } from './Button';
import { AddItemFrom } from './AddItemFrom';
import { AdditableSpan } from './AdditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



export type TodolistItemPropsType = {
    title: string
    id: string
    tasks: TaskType[]
    filter: FilterValues
    deleteTasks: (todolistId: string,taskId: string) => void
    changeFilter: (todolistId: string,changeFilter: FilterValues) => void
    createTasks: (todolistId: string,title: string) => void
    changeTaskStatus: (todolistId: string,taskId: string, isDone: boolean) => void
    changeTaskTitle:(todolistId: string,taskId: string, newTitle: string) => void
    removeTodolist: (todolisId: string) => void
    
}

export const TodolistItem = ({title,filter, id,tasks,deleteTasks,changeFilter,changeTaskStatus,createTasks,removeTodolist,changeTaskTitle}:TodolistItemPropsType) => { 
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const addTask = (title: string) => {
        createTasks(id,title)
    }

    return (
      <div>
        <h3>{title} <Button title='X' onClick={removeTodolistHandler}/></h3>
        <AddItemFrom addItem={addTask} />
        {tasks.length === 0 
        ?(<p>No tasks</p>)
        :(
        <ul>
            {tasks.map(task => {
                const deleteTasksHandler = () => {
                    deleteTasks(id,task.id)
                }

                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    changeTaskStatus(id,task.id, newStatusValue)
                }

                const onChangeTaskTitleHandler = (newValue: string) => {
                    changeTaskTitle(id,task.id, newValue)
                }
                return(
                    <li key={task.id} className={task.isDone? 'is-done': ''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/> 
                    <AdditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                    <Button title='X' onClick={deleteTasksHandler}/>
                  </li>
                )
            })}
        </ul>
        )}
        <div>
        <Button className={filter === 'all'? 'active-filter': '' } title={"All"} onClick={()=>changeFilter(id,'all')}/>
        <Button className={filter === 'active'? 'active-filter': '' } title={"Active"} onClick={()=>changeFilter(id ,'active')}/>
        <Button className={filter === 'completed'? 'active-filter': '' } title={"Completed"} onClick={()=>changeFilter(id ,'completed')}/>
        </div>
      </div>
  )
}
