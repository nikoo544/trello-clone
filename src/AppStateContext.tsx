import React, {createContext, useReducer, useContext} from "react";
import {v1 as uuid} from 'uuid'
import {findItemIndexById} from "./utils/findItemIndexById";

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const useAppState = () => {
    return useContext(AppStateContext)
}

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            //Reducer logic here...
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuid(), text: action.payload, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            //Reducer logic here...
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            )
            state.lists[targetLaneIndex].tasks.push({
                id: uuid(),
                text: action.payload.text
            })
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}

// Interfaces

interface AppStateContextProps {
    state: AppState
    dispatch: any
}

export interface AppState {
    lists: List[]
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
    payload: { text: string; taskId: string }
}


//Provisional hardcode data
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
    ]
}

export const AppStateProvider = ({children}: React.PropsWithChildren<{}>) => {

    const [state, dispatch] = useReducer(appStateReducer,appData)

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}