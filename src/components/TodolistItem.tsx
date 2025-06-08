import { Button } from './Button';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
}

export const TodolistItem = ({title, tasks}:TodolistItemPropsType) => {
  return (
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <Button title={"+"}/>
        </div>
        {tasks.length === 0 
        ?(<p>No tasks</p>)
        :(
        <ul>
            {tasks.map(task => {
                return(
                    <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                  </li>
                )
            })}
        </ul>
        )}
        <div>
        <Button title={"All"}/>
        <Button title={"Active"}/>
        <Button title={"Completed"}/>
        </div>
      </div>
  )
}
