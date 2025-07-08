import { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = ({title,onChange}:EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [editableTitle, setEditableTitle] = useState('')

    const editModeOnHandler = () => {
        setEditMode(true)
    }

    const editModeOffHandler = () => {
        setEditMode(false)
        onChange(editableTitle)
    }

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.currentTarget.value)
    }

    return(
        editMode
        ?<input onBlur={editModeOffHandler} autoFocus value={editableTitle} onChange={onChangeInputHandler}/>
        :<span onDoubleClick={editModeOnHandler}>{title}</span>
    )
}