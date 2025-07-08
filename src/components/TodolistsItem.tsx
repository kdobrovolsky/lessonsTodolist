import { ChangeEvent, useState ,KeyboardEvent} from "react"
import { FilterValues } from "../App"
import { Button } from "./ui/Button"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    deleteTasks: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTasks: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
 }

export const TodolistItem = ({title,tasks,deleteTasks,changeFilter,createTasks,changeTaskStatus}: TodolistItemPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    
    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        
    }

    const onCreateNewTaskHandler = () => {
       if(taskTitle.trim() !== ''){
        createTasks(taskTitle.trim())
        setTaskTitle('')
       }
    }

    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && taskTitle.trim() !== ''){
            createTasks(taskTitle.trim())
            setTaskTitle('')
        }
    }

    return (
        <div>
          <h3>{title}</h3>
          <div>
            <input value={taskTitle} onChange={onChangeInputHandler} onKeyDown={onKeyDownHandler}/>
            <Button title="+" onClick={onCreateNewTaskHandler}/>
          </div>
          <ul>
            {tasks.map(task => {

                const deleteTasksHandler = () => {
                    deleteTasks(task.id)
                }

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id,e.currentTarget.checked) 
                }

                return(
                    <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/> <span>{task.title}</span>
                    <Button title="X" onClick={deleteTasksHandler}/>
                  </li>
                )
            }) }
          
          </ul>
          <div>
          <Button title="All" onClick={()=>changeFilter('all')}/>
          <Button title="Active" onClick={()=>changeFilter('active')}/>
          <Button title="Completed" onClick={()=>changeFilter('completed')}/>
          </div>
        </div>
    )
  }