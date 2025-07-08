import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export type EditableSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = ({ title, onChange }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const editModeOnHandler = () => {
    setEditMode(true);
  };

  const editModeOffHandler = () => {
    setEditMode(false);
    onChange(editableTitle);
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      label="Task"
      id="outlined-size-small"
      defaultValue="Small"
      size="small"
      onBlur={editModeOffHandler}
      autoFocus
      value={editableTitle}
      onChange={onChangeInputHandler}
    />
  ) : (
    <span onDoubleClick={editModeOnHandler}>{title}</span>
  );
};
