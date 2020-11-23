import React, {createContext, useReducer, useContext} from "react";
import {v1 as uuid} from 'uuid'
import {findItemIndexById, overrideItemAtIndex, moveItem} from "./utils/arrayUtils";
import {DragItem} from "./Components/DragItem";

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const useAppState = () => {
    return useContext(AppStateContext)
}

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    {id: uuid(), text: action.payload, tasks: []}
                ]
            }
        }
        case "ADD_TASK": {
            const targetListIndex = findItemIndexById(
                state.lists,
                action.payload.listId
            )
            const targetList = state.lists[targetListIndex]
            const updatedTargetList = {
                ...targetList,
                tasks: [
                    ...targetList.tasks,
                    { id: uuid(), text: action.payload.text }
                ]
            }
            return {
                ...state,
                lists: overrideItemAtIndex(
                    state.lists,
                    updatedTargetList,
                    targetListIndex
                )
            }
        }

        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            return {
                ...state,
                lists: moveItem(state.lists, dragIndex, hoverIndex)
            }
        }

        case "SET_DRAGGED_ITEM": {
            return {...state, draggedItem: action.payload}
        }
        case "MOVE_TASK": {
            const {
                dragIndex,
                hoverIndex,
                sourceColumn,
                targetColumn
            } = action.payload
            const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
            const targetLaneIndex = findItemIndexById(state.lists, targetColumn)
            const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex,1)[0]
            state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
            return { ...state }
        }
        default: {
            return state
        }
    }
}

// Interfaces

interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<Action>
}

export interface AppState {
    lists: List[]
    draggedItem: DragItem | undefined;
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

interface Task {
    id: string
    text: string
}

//Actions

type Action =
    | {
    type: "ADD_LIST"
    payload: string
}
    | {
    type: "ADD_TASK"
    payload: { text: string; listId: string }
}
    | {
    type: "MOVE_LIST"
    payload: {
        dragIndex: number
        hoverIndex: number
    }
}
    | {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | undefined
}
    | {
    type: "MOVE_TASK"
    payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
    }
}
//Provisional hardcode data

//In this block, i set the draggedItem field of our state to whatever we get from
// action.payload. bitch

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{id: "c0", text: "Generate app scaffold"}]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{id: "c2", text: "Learn Typescript"}]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{id: "c3", text: "Begin to use static typing"}]
        }
    ],

    draggedItem: undefined

}

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {

    const [state, dispatch] = useReducer(appStateReducer, appData)

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}