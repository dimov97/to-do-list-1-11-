import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddNewItem} from "./AddNewItem";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,

} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = 'all'|'active'|'complete'
export type todolistsType = {
    id:string
    title:string
    filter:filterType
}
export type tasksStateType = {
    [key:string]:tasksType[]
}


function AppWithRedux() {
    console.log('AppWithRedux called')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState,todolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState,tasksStateType>(state => state.tasks)
    const  filterTask = useCallback((value:filterType,todolistId:string) => {
        const action =ChangeTodolistFilterAC(todolistId,value)
        dispatch(action)
    },[dispatch])

    const  removeTask = useCallback((id: string,todolistId:string) => {
        const action = removeTaskAC(id,todolistId)
        dispatch(action)
    },[dispatch])
    const  addTask = useCallback((newTitle:string,todolistId:string) => {
        const action = addTaskAC(newTitle,todolistId)
        dispatch(action)
    },[dispatch])
    const  changeTaskStatus = useCallback((id:string, isDone:boolean,todolistId:string) => {
        const action = changeTaskStatusAC(id,isDone,todolistId)
        dispatch(action)
    },[dispatch])
    const  changeTaskTitle = useCallback((id:string, newTitle:string,todolistId:string) => {
        const action = changeTaskTitleAC(id,newTitle,todolistId)
        dispatch(action)
    },[dispatch])




    const  removeTodolist = useCallback((id:string) => {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    },[dispatch])
    const addTodolist = useCallback((newTitle:string) => {
        const action = AddTodolistAC(newTitle)
        dispatch(action)
    },[dispatch])
    const  changeTodolistTitle = useCallback((newTitle:string,id:string) => {
        const action = ChangeTodolistTitleAC(id,newTitle)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <AddNewItem addItem={addTodolist}/>
            {todolists.map((tl)=> {
                let filteredTasks = tasks[tl.id]


                return (
                    <Todolist title={tl.title}
                              id={tl.id}
                              key={tl.id}
                              tasks={filteredTasks}
                              removeTask={removeTask}
                              filterTask={filterTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                              changeTaskTitle={changeTaskTitle}
                              changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default AppWithRedux;
