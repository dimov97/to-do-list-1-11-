import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange:(newTitle:string)=>void
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo( ({title,onChange}) => {
    console.log('EditableSpan is called')
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState('')
    const activeEditMode = () => {
        setEditMode(true)
        setNewTitle(title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        onChange(newTitle)
    }
    return editMode
        ? <input value={newTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(e.currentTarget.value)
        }} autoFocus onBlur={activeViewMode}/>
        : <span onDoubleClick={activeEditMode}>{title}</span>
});

