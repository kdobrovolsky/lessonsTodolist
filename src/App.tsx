import './App.css'
import { TaskType, TodolistItem } from './components/TodolistItem'

 
export const App = () =>{
  const tasks: TaskType[] = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ]
  return (
      <div className="app">
        <TodolistItem 
        title='Todolist'
         tasks={tasks} />
      </div>
  )
}
 
