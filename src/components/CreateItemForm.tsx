import { ChangeEvent, useState,KeyboardEvent } from "react";
import { Button } from "./ui/Button";

export type CreateItemFormPropsType = {
    addTask:(title: string) => void
}


export const CreateItemForm = ({addTask}: CreateItemFormPropsType) => {
     const [taskTitle, setTaskTitle] = useState("");
      const [error, setError] = useState<string | null>(null);
    
      const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        setError(null);
      };
    
      const onCreateNewTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim());
          setTaskTitle("");
        } else {
          setError("Title is requared");
        }
      };
    
      const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle.trim() !== "") {
            addTask(taskTitle.trim());
          setTaskTitle("");
        } else {
          setError("Title is requared");
        }
      };
    
    return(
        <div>
        <input
          value={taskTitle}
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button title="+" onClick={onCreateNewTaskHandler} />
        {error ? <div className="error-message">{error}</div> : ""}
      </div>
    )
}