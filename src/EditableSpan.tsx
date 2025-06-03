import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}:Props) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(title);

     const onChangeSetTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      
        setNewTitle(e.currentTarget.value);
      };

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        
        setIsEditMode(false)
        changeTitle(newTitle)
    }
    return (
        isEditMode
        ?<TextField
        variant="standard"
        value={newTitle}
        onBlur={offEditMode}
        autoFocus
        onChange={onChangeSetTitleHandler}
       
        />
        :<span onDoubleClick={onEditMode}>{title}</span>

  );
};
