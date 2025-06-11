import { KeyboardEvent,ChangeEvent, useState } from 'react';
import { Button } from './Button';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemFrom = ({addItem}:AddItemFormPropsType) => {
    
    const [taskTitle, setTaskTile] = useState('')
    const [error, setError] = useState<null|string>(null)

    const changeTaskTitleHandler  = (e:ChangeEvent<HTMLInputElement>) => {
            setTaskTile(e.currentTarget.value)
            setError(null) // при введение чего-либо в инпут ошибка пропадает
        }
    
        const onClickButtonHandler = () => {
    
            if(taskTitle !== ''){
                addItem(taskTitle.trim())
                setTaskTile('')
            }else{
                setError('Title is required')
            }
            
        }
    
        const createTaskOnEnterHandler  = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter' && taskTitle !== ''){
                addItem(taskTitle.trim())
                setTaskTile('')
            }else{
                setError('Title is required')
            }
        }

    return (
      <div>
              <input className={error ? "error": ''} value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler } />
              <Button title={"+"} onClick={onClickButtonHandler}/>
             <p className={error? 'error-message': ''}> {error}</p>
    </div>
  );
};
