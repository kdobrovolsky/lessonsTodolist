import { FilterValues, TodolistsType } from "../app/App";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";



export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist') 
export const createTodolistAC = createAction('todolists/createTodolist',(title) => {
    return{
        payload: {title, id: nanoid()}
    }
}) 
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id: string; filter: FilterValues; }>('todolists/changeTodolistFilter')


const initialState: TodolistsType[] = []

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder.addCase(deleteTodolistAC,(state, action)=>{
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
    })
    .addCase(createTodolistAC, (state,action) => {
        state.push({id: action.payload.id,title: action.payload.title,filter: "all",})
    })
    .addCase(changeTodolistTitleAC,(state,action)=>{
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state[index].title = action.payload.title
    })
    .addCase(changeTodolistFilterAC,(state,action)=>{
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state[index].filter = action.payload.filter
    })
})


