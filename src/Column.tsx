import React, {useRef} from "react";
import {useAppState} from "./AppStateContext";
import {ColumnContainer, ColumnTitle} from "./styles"
import {AddNewItem} from "./AddNewItem";
import {Card} from "./Card";
import {useItemDrag} from "./useItemDrag";

interface ColumnProps {
    text?: string
    index: number
    id: string
}

export const Column = ({text, index, id}: ColumnProps) => {
    const {state, dispatch} = useAppState()
    const ref = useRef<HTMLDivElement>(null)

    const {drag} = useItemDrag({type: "COLUMN", id, index, text})

    drag(ref)

    return (
        <ColumnContainer ref={ref}>
            <ColumnTitle> {text} </ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card text={task.text} key={task.id} index={i}/>
            ))}
            <AddNewItem onAdd={text =>
                dispatch({type: "ADD_TASK", payload: {text, taskId: id}})} toggleButtonText={"+ Add another task"}
                        dark/>
        </ColumnContainer>
    )
}
