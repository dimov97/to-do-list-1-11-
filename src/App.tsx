import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddNewItem} from "./AddNewItem";

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


function App() {


    function filterTask(value:filterType,todolistId:string) {
        let todolist = todolists.find(tl=>tl.id===todolistId)
        if (todolist) {
            todolist.filter=value
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string,todolistId:string) {
        let todolistTask = tasks[todolistId]
        tasks[todolistId] = todolistTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    function addTask(newTitle:string,todolistId:string) {
        let todolistTask = tasks[todolistId]
        let task = {id: v1(), title: newTitle, isDone: false}
        tasks[todolistId] = [task,...todolistTask]
        setTasks({...tasks})
    }
    function changeTaskStatus(id:string, isDone:boolean,todolistId:string) {
        let todolistTask = tasks[todolistId]
        let changeTask = todolistTask.find(t=>t.id===id)
        if (changeTask) {
            changeTask.isDone=isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(id:string, newTitle:string,todolistId:string) {
        let todolistTask = tasks[todolistId]
        let changeTask = todolistTask.find(t=>t.id===id)
        if (changeTask) {
            changeTask.title=newTitle
            setTasks({...tasks})
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<todolistsType[]>([
        {id:todolistId1, title:'what to learn ?', filter:'all'},
        {id:todolistId2, title:'what to buy ?', filter:'all'},
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]:[
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false}
        ],
        [todolistId2]:[
            {id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'milk', isDone: false}
        ]
    })
    function removeTodolist(id:string) {
        setTodolists(todolists.filter(tl=>tl.id!==id))
        delete tasks[id]
        setTasks({...tasks})
    }
    function addTodolist(newTitle:string) {
        let newTodolist:todolistsType = {id:v1(), title:newTitle, filter:'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newTodolist.id]:[]})
    }
    function changeTodolistTitle(newTitle:string,id:string) {
        let newTodolistTitle = todolists.find(tl=>tl.id===id)
        if (newTodolistTitle) {
            newTodolistTitle.title=newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddNewItem addItem={addTodolist}/>
            {todolists.map((tl)=> {
                let filteredTasks = tasks[tl.id]
                if (tl.filter==='active') {
                    filteredTasks = filteredTasks.filter(t=>!t.isDone)
                }
                if (tl.filter==='complete') {
                    filteredTasks = filteredTasks.filter(t=>t.isDone)
                }
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

export default App;
