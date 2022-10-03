import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {tasksType} from "./AppWithRedux";

type TaskType = {
    changeTaskStatus:(id:string,isDone:boolean,todolistId:string)=>void
    changeTaskTitle:(id:string,newTitle:string,todolistId:string)=>void
    removeTask:(id:string,todolistId:string)=>void
    t:tasksType
    todolistId:string
}

export const Task:React.FC<TaskType> = React.memo( ({changeTaskStatus,changeTaskTitle,removeTask,t,todolistId}) => {
    const removeTaskHandler = ()=>{removeTask(t.id,todolistId)}
    const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        let newTaskStatus = e.currentTarget.checked
        changeTaskStatus(t.id, newTaskStatus,todolistId)
    }
    const changeTaskTitleHandler = useCallback( (newTitle:string)=>{
        changeTaskTitle(t.id, newTitle,todolistId)
    },[t.id,changeTaskTitle, todolistId])
    return (
        <li key={t.id} className={t.isDone?'isDone':''}>
            <button onClick={removeTaskHandler}>x</button>
            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
        </li>
    );
});

