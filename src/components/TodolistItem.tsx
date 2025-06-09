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
    id: string
    tasks: TaskType[]
    filter: FilterValues
    deleteTasks: (todolistId: string,taskId: string) => void
    changeFilter: (todolistId: string,changeFilter: FilterValues) => void
    createTasks: (todolistId: string,title: string) => void
    changeTaskStatus: (todolistId: string,taskId: string, isDone: boolean) => void
    removeTodolist: (todolisId: string) => void
}

export const TodolistItem = ({title,filter, id,tasks,deleteTasks,changeFilter,createTasks,changeTaskStatus,removeTodolist}:TodolistItemPropsType) => {
    const [taskTitle, setTaskTile] = useState('')
    const [error, setError] = useState<null|string>(null)
    
    const changeTaskTitleHandler  = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTile(e.currentTarget.value)
        setError(null) // при введение чего-либо в инпут ошибка пропадает
    }

    const onClickButtonHandler = () => {

        if(taskTitle !== ''){
            createTasks(id,taskTitle.trim())
            setTaskTile('')
        }else{
            setError('Title is required')
        }
        
    }

    const createTaskOnEnterHandler  = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && taskTitle !== ''){
            createTasks(id,taskTitle.trim())
            setTaskTile('')
        }else{
            setError('Title is required')
        }
    }

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    return (
      <div>
        <h3>{title} <Button title='X' onClick={removeTodolistHandler}/></h3>
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
                    deleteTasks(id,task.id)
                }

                const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatusValue = e.currentTarget.checked
                    changeTaskStatus(id,task.id, newStatusValue)
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
        <Button className={filter === 'all'? 'active-filter': '' } title={"All"} onClick={()=>changeFilter(id,'all')}/>
        <Button className={filter === 'active'? 'active-filter': '' } title={"Active"} onClick={()=>changeFilter(id ,'active')}/>
        <Button className={filter === 'completed'? 'active-filter': '' } title={"Completed"} onClick={()=>changeFilter(id ,'completed')}/>
        </div>
      </div>
  )
}
