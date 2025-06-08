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

  let filteredTasks = tasks
  if(filter === 'active'){
    filteredTasks = tasks.filter(task => !task.isDone)
  }
  if(filter === 'completed'){
    filteredTasks = tasks.filter(task => task.isDone)
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const createTasks = (title: string) => {
   const newTask = { id: v1(), title, isDone: false }
   const newTasks = [newTask,...tasks]
   setTasks(newTasks)
  }
  

  return (
      <div className="app">
        <TodolistItem 
        title='Todolist'
         tasks={filteredTasks} 
         deleteTasks = {deleteTasks}
         changeFilter= {changeFilter}
         createTasks = {createTasks}
         />
      </div>
  )
}



