import {useDrag} from "react-dnd";
import {useAppState} from "./AppStateContext";
import {DragItem} from "./DragItem";

//This hook return a 'drag' method that accepts the ref of a draggable element.
//
// start draggin the item --> hook dispatch "SET_DRAG_ITEM" action.
// stop draggin the item --> hook dispatch "SET_DRAG_ITEM" with "undefined" as payload.


export const useItemDrag = (item: { index: number; id: string; text: string | undefined; type: string }) => {
    const {dispatch} = useAppState()
    const [, drag] = useDrag({
        item,
        begin: () =>
            dispatch({
                type: "SET_DRAGGED_ITEM",
                payload: item
            }),
        end: () => dispatch({type: "SET_DRAGGED_ITEM", payload: undefined})
    })
    return {drag}
}