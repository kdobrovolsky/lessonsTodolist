import { useState } from 'react'
import './App.css'
import { TaskType, TodolistItem } from './components/TodolistItem'
import {v1} from 'uuid'

export type FilterValues = 'all' | 'active' | 'completed' 
 
export const App = () =>{
  const [tasks, setTasks]= useState<TaskType[] >( [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
  ]) 
  const [filter, setFilter] = useState<FilterValues>('all')

  const deleteTasks = (taskId: string) => {   
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId ) )
  } 

  
  const filterTasks = ():TaskType[] => {
    let filteredTasks = tasks
    switch(filter){
      case 'active':
        return filteredTasks = tasks.filter(task => !task.isDone)
      case 'completed':
       return filteredTasks = tasks.filter(task => task.isDone)
       default: return tasks;
    }
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const createTasks = (title: string) => {
   const newTask = { id: v1(), title, isDone: false }
   const newTasks = [newTask,...tasks]
   setTasks(newTasks)
  }
  
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? {...task,isDone}: task))
  }

  return (
      <div className="app">
        <TodolistItem 
        title='Todolist'
        filter = {filter}
         tasks={filterTasks()} 
         deleteTasks = {deleteTasks}
         changeFilter= {changeFilter}
         createTasks = {createTasks}
         changeTaskStatus = {changeTaskStatus}
         />
      </div>
  )
}



