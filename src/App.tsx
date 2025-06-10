import { useState } from 'react'
import './App.css'
import {TaskType, TodolistItem } from './components/TodolistItem'
import {v1} from 'uuid'

export type FilterValues = 'all' | 'active' | 'completed' 
export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}
 
export const App = () =>{

  const deleteTasks = (todolistId: string,taskId: string) => {   
    let task = tasks[todolistId]
    let filteredTasks = task.filter(t=> t.id != taskId)
    tasks[todolistId] = filteredTasks
    setTasks({...tasks})
    // setTasks(prevTasks => prevTasks[todolistId].filter(task => task.id != taskId) )
  } 

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl=> tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasks[todolistId]
    setTasks(tasks)
  }
  
 

  const changeFilter = (todolistId: string,filter: FilterValues) => {
    setTodolists(prevTodolist => prevTodolist.map(tl=> tl.id === todolistId ? {...tl,filter} : tl  ))
  }

  const createTasks = (todolistId: string,title: string) => {
   const newTask = { id: v1(), title, isDone: false }
   const newTasks = [newTask,...tasks[todolistId]]
   tasks[todolistId]= newTasks
   setTasks({...tasks})
  }
  
  const changeTaskStatus = (todolistId: string,taskId: string, isDone: boolean) => {
  let tasksStatus = tasks[todolistId]
  let task = tasksStatus.find(t => t.id ===taskId)
  if(task){
    task.isDone = isDone
    setTasks({...tasks})
  }
  }

  const todolistID1 = v1();
  const todolistID2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    {id: todolistID1, title: 'What To Learn', filter: 'all'},
    {id: todolistID2, title: 'Todolists', filter: 'all'}
  ])

  const [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  return (
      <div className="app">
        {todolists.map(tl => {
          
          const filterTasks= (): TaskType[] => {
            let filteredTasks = tasks[tl.id]
            switch(tl.filter){
              case 'active':
                return filteredTasks = tasks[tl.id].filter(task => !task.isDone)
              case 'completed':
               return filteredTasks = tasks[tl.id].filter(task => task.isDone)
               default: return tasks[tl.id];
            }
          }
          return(
            
        <TodolistItem 
        key={tl.id}
        id = {tl.id}
        title={tl.title}
        filter = {tl.filter}
         tasks={filterTasks()} 
         deleteTasks = {deleteTasks}
         changeFilter= {changeFilter}
         createTasks = {createTasks}
         changeTaskStatus = {changeTaskStatus}
         removeTodolist ={ removeTodolist}
         />
          )
        })}
        
      </div>
  )
}



