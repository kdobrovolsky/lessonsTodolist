import React, { ChangeEvent, useState } from "react";

export type AdditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void
};

export const AdditableSpan = ({ title,onChange }: AdditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let[TaskTitle, setTaskTitle] = useState(title)

  const activeteEditMode = () => {
    setEditMode(true);
  }
  const activeteViewMode = () => {
    setEditMode(false);
    onChange(title)
  }
  const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    
  }

  return editMode ? (
    <input value={TaskTitle} onChange={onChangeInputHandler} onBlur={activeteViewMode} autoFocus/>
  ) : (
    <span onDoubleClick={activeteEditMode} >
      {title}
    </span>
  );
};
