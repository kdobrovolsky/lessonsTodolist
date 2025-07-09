import { v1 } from "uuid";
import { TasksState } from "../App";
import { CreateTodolistActionType, DeleteTodolistActionType } from "./todolist-reducer";

export type DeleteTasksActionType = ReturnType<typeof deleteTaskAC>
export type CreateTasksActionType = ReturnType<typeof createTaskAC>
type ActionType = DeleteTodolistActionType | CreateTodolistActionType | DeleteTasksActionType | CreateTasksActionType

export const tasksReducer = (tasks: TasksState = {}, action: ActionType) => {
    switch (action.type) {
        case 'delete_todolist': {
            const copyTaskState = { ...tasks };
            delete copyTaskState[action.payload.id];
            return copyTaskState;
        }
        case 'create-todolist': {
            return { ...tasks, [action.payload.id]: [] };
        }
        case 'delete-tasks': {
            return {
                ...tasks,
                [action.payload.todolistId]: tasks[action.payload.todolistId].filter(
                    (t) => t.id !== action.payload.id
                ),
            };
        }
        case 'create-tasks': {
            const newTask = {
                id: Date.now().toString(), // Генерируем уникальный id
                title: action.payload.title,
                isDone: false,
            };
            return {
                ...tasks,
                [action.payload.todolistId]: [
                    newTask,
                    ...tasks[action.payload.todolistId], // Добавляем новую задачу в начало
                ],
            };
        }
        default:
            return tasks;
    }
};

export const deleteTaskAC = (todolistId: string,id: string) => ({
    type: 'delete-tasks',
    payload:{
        id,
        todolistId
    }
})

export const createTaskAC = (todolistId: string, title: string) => ({
    type: 'create-tasks',
    payload:{
        todolistId,
        title
    }
})