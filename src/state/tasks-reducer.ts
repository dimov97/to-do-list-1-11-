import {tasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from './todolists-reducer'


type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}

type ActionTypes =
    removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState = {
    [todolistId1]: [
        {id: v1(), title: 'html', isDone: true},
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: 'book', isDone: true},
        {id: v1(), title: 'milk', isDone: false}
    ]
}

export const tasksReducer = (state: tasksStateType = initialState, action: ActionTypes): tasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK' : {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTasks = [{id: v1(), title: action.title, isDone: false}, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS' : {
            let todolistTask = state[action.todolistId]
            state[action.todolistId] = todolistTask
                .map(t => t.id === action.taskId ? {...t, isDone: action.isDone}
                    : t)
            return ({...state})
        }

case
    'CHANGE-TASK-TITLE'
: {
    let todolistTask = state[action.todolistId]
    state[action.todolistId] = todolistTask
        .map(t => t.id === action.taskId ? {...t, title: action.title}
            : t)
    return ({...state})
}
case
    'ADD-TODOLIST'
:
    {
        const stateCopy = {...state}
        stateCopy[action.todolistId] = []
        return stateCopy
    }
case
    'REMOVE-TODOLIST'
:
    {
        const stateCopy = {...state}
        delete stateCopy[action.id]
        return stateCopy
    }
default:
    return state;
}
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}