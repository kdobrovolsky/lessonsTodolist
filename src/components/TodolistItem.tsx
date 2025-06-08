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
    filter: FilterValues
    deleteTasks: (taskId: string) => void
    changeFilter: (changeFilter: FilterValues) => void
    createTasks: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodolistItem = ({title,filter, tasks,deleteTasks,changeFilter,createTasks,changeTaskStatus}:TodolistItemPropsType) => {
    const [taskTitle, setTaskTile] = useState('')
    const [error, setError] = useState<null|string>(null)
    
    const changeTaskTitleHandler  = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTile(e.currentTarget.value)
        setError(null) // при введение чего-либо в инпут ошибка пропадает
    }

    const onClickButtonHandler = () => {

        if(taskTitle !== ''){
            createTasks(taskTitle.trim())
            setTaskTile('')
        }else{
            setError('Title is required')
        }
        
    }

    const createTaskOnEnterHandler  = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && taskTitle !== ''){
            createTasks(taskTitle.trim())
            setTaskTile('')
        }else{
            setError('Title is required')
        }
    }

    return (
      <div>
        <h3>{title}</h3>
        <div>
          <input className={error ? "error": ''} value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler } />
          <Button title={"+"} onClick={onClickButtonHandler}/>
         <p className={error? 'error-message': ''}> {error}</p>
        </div>
        {tasks.length === 0 
        ?(<p>No tasks</p>)
        :(
        <ul>
            {tasks.map(task => {
                const deleteTasksHandler = () => {
                    deleteTasks(task.id)
                }

                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    changeTaskStatus(task.id, newStatusValue)
                }
                return(
                    <li key={task.id} className={task.isDone? 'is-done': ''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/> <span>{task.title}</span>
                    <Button title='X' onClick={deleteTasksHandler}/>
                  </li>
                )
            })}
        </ul>
        )}
        <div>
        <Button className={filter === 'all'? 'active-filter': '' } title={"All"} onClick={()=>changeFilter('all')}/>
        <Button className={filter === 'active'? 'active-filter': '' } title={"Active"} onClick={()=>changeFilter('active')}/>
        <Button className={filter === 'completed'? 'active-filter': '' } title={"Completed"} onClick={()=>changeFilter('completed')}/>
        </div>
      </div>
  )
}
