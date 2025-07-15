import { v1 } from "uuid";
import { FilterValues, TodolistsType } from "../App";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type ActionType = DeleteTodolistActionType | CreateTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (todolists: TodolistsType[], action:ActionType):TodolistsType[] => {
   switch (action.type) {
    case 'delete_todolist':
        const {id} = action.payload
        return todolists.filter((t) => t.id !== id)
    case 'create_todolist':
     
    const newTodolist: TodolistsType = {
      id: action.payload.id,
      title: action.payload.title,
      filter: "all",
    };
    return [...todolists, newTodolist]
    case 'change_todolist_title':
        return  todolists.map((t) => (t.id === action.payload.id ? { ...t, title: action.payload.title } : t))
    case 'change_todolist_filter':
        return  todolists.map((t) => (t.id === action.payload.id ? { ...t, filter: action.payload.filter } : t))
   default:
    return todolists;
    }
   
} 
export const deleteTodolistAC = (id: string) => ({
    type: 'delete_todolist',
    payload: {
        id
    }
}as const)

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
   
    payload: {
        title,
        id: v1()
    }
}as const)


export const changeTodolistTitleAC = ({id,title}: {id: string, title: string}) => ({
    type: 'change_todolist_title',
    payload:{
        id, 
        title
    }
}as const)

export const changeTodolistFilterAC = ({ id, filter }: { id: string; filter: FilterValues; }) => ({
    type: 'change_todolist_filter',
    payload: {
        id,
        filter
    }
}as const)