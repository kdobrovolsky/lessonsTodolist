import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import { TasksState } from '../app/App';
import { createTodolistAC, deleteTodolistAC } from "./todolist-reducer";


export const deleteTasksAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTasks') 
export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTasks') 
export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string,isDone: boolean}>('tasks/changeTaskStatus') 
export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string,title: string}>('tasks/changeTaskTitle') 

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState,(builder)=>{
      builder.addCase(deleteTodolistAC,(state, action)=>{
       delete state[action.payload.id]
       })
       .addCase(createTodolistAC, (state,action) => {
        state[action.payload.id] = []
       })
       .addCase(deleteTasksAC,(state,action)=>{
        const tasks = state[action.payload.todolistId]
        if(tasks){
            const index = tasks.findIndex(t=> t.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1); 
              }
        }
       })
       .addCase(createTaskAC,(state,action)=>{
        const tasks = state[action.payload.todolistId]
        if(tasks){
            tasks.unshift({ id: nanoid(), title: action.payload.title, isDone: false })
        }
       })
       .addCase(changeTaskStatusAC,(state,action)=>{
        const tasks = state[action.payload.todolistId]
        const task = tasks.find(t=> t.id === action.payload.taskId )
        if(task){
            task.isDone = action.payload.isDone
        }
       })
       .addCase(changeTaskTitleAC,(state,action)=>{
        const tasks = state[action.payload.todolistId]
        const task = tasks.find(t=> t.id === action.payload.taskId )
        if(task){
            task.title = action.payload.title
        }
       })
})
