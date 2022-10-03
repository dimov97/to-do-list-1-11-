import React, {ChangeEvent, useCallback} from 'react';
import {filterType, tasksType} from "./App";
import {AddNewItem} from "./AddNewItem";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

type TodolistType = {
    id:string
    title:string
    tasks:tasksType[]
    removeTask:(id:string,todolistId:string)=>void
    filterTask:(value:filterType,todolistId:string)=>void
    addTask:(newTitle:string,todolistId:string)=>void
    changeTaskStatus:(id:string,isDone:boolean,todolistId:string)=>void
    changeTaskTitle:(id:string,newTitle:string,todolistId:string)=>void
    filter:filterType
    removeTodolist:(id:string)=>void
    changeTodolistTitle:(newTitle:string,id:string)=>void
}

export const Todolist:React.FC<TodolistType> = React.memo( ({title,tasks,removeTask,filterTask,addTask,changeTaskStatus,filter,id,removeTodolist,changeTaskTitle,changeTodolistTitle}) => {

    console.log('Todolist is called')

    const onClickAllHandler = useCallback( ()=>{filterTask('all',id)},[filterTask,id])
    const onClickActiveHandler = useCallback( ()=>{filterTask('active',id)},[filterTask,id])
    const onClickCompleteHandler = useCallback( ()=>{filterTask('complete',id)},[filterTask,id])
    const removeTodolistHandler = ()=>{
        removeTodolist(id)
    }
    const addTasks = useCallback( (newTitle:string) => {
        addTask(newTitle,id)
    },[addTask, id])
    const changeTodolistTitleHandler = useCallback( (newTitle:string) => {
        changeTodolistTitle(newTitle,id)
    }, [changeTodolistTitle,id])

    let filteredTasks = tasks

    if (filter==='active') {
        filteredTasks = tasks.filter(t=>!t.isDone)
    }
    if (filter==='complete') {
        filteredTasks = tasks.filter(t=>t.isDone)
    }
    return (
        <div>
            <h3><button onClick={removeTodolistHandler}>x</button> <EditableSpan title={title} onChange={changeTodolistTitleHandler}/></h3>
            <AddNewItem addItem={addTasks}/>
            <ul>
                {tasks.map((t)=> <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={removeTask} t={t} todolistId={id} key={t.id}/>)}
            </ul>
            <div>
                <button className={filter==='all'?'activeFilter':''} onClick={onClickAllHandler}>All</button>
                <button className={filter==='active'?'activeFilter':''} onClick={onClickActiveHandler}>Active</button>
                <button className={filter==='complete'?'activeFilter':''} onClick={onClickCompleteHandler}>Completed</button>
            </div>
        </div>
    );
});

