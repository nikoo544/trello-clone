import React, {useRef} from "react";
import {useAppState} from "../AppStateContext";
import {ColumnContainer, ColumnTitle} from "../styles"
import {AddNewItem} from "./AddNewItem";
import {Card} from "./Card";
import {useItemDrag} from "../utils/useItemDrag";
import {useDrop} from "react-dnd";
import {ColumnDragItem} from "./DragItem";
import {isHidden} from "../utils/isHidden";


interface ColumnProps {
    text: any
    index: number
    id: string
    isPreview?: boolean
}

export const Column = ({text, index, id, isPreview}: ColumnProps) => {

    const {state, dispatch} = useAppState()

    const [, drop, ] = useDrop({
        accept: "COLUMN",
        hover(item: ColumnDragItem) {
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }
            dispatch({type: "MOVE_LIST", payload: {dragIndex, hoverIndex}})
            item.index = hoverIndex
        }
    })


    const ref = useRef<HTMLDivElement>(null)
    const {drag} = useItemDrag({type: "COLUMN", id, index, text,})

    drag(drop(ref))

    return (
        <ColumnContainer
            isPreview={isPreview}
            ref={ref}
            isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
        >
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task, i) => (
                <Card columnId={task.id} id={task.id} text={task.text} key={task.id} index={i}/>
            ))}
            <AddNewItem
                toggleButtonText="+ Add another card"
                onAdd={text =>
                    dispatch({type: "ADD_TASK", payload: {text, listId: id}})
                }
                dark
            />
        </ColumnContainer>
    )
}
