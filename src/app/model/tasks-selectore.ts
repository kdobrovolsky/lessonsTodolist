import { TasksState } from "../App";
import { RootState } from "../store";

 
export const selectTasks = (state: RootState): TasksState => state.tasks