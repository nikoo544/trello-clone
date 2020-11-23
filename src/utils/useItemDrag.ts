import {useDrag} from "react-dnd";
import {useAppState} from "../AppStateContext";
import { DragItem } from "../Components/DragItem"
import {getEmptyImage} from 'react-dnd-html5-backend'
import {useEffect} from "react";

//This hook return a 'drag' method that accepts the ref of a draggable element.
//
// start draggin the item --> hook dispatch "SET_DRAG_ITEM" action.
// stop draggin the item --> hook dispatch "SET_DRAG_ITEM" with "undefined" as payload.


export const useItemDrag = (item: DragItem) => {
    const {dispatch} = useAppState()
    const [, drag, preview] = useDrag({
        item,
        begin: () =>
            dispatch({
                type: "SET_DRAGGED_ITEM",
                payload: item
            }),
        end: () => dispatch({type: "SET_DRAGGED_ITEM", payload: undefined})
    })
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true});
    }, [preview]);
    return {drag}
}