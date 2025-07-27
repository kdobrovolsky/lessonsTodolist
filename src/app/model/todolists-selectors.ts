import { TodolistsType } from "../App";
import { RootState } from "../store";

 
export const selectTodolists = (state: RootState): TodolistsType[] => state.todolists