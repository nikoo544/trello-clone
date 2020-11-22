import React from 'react';
import {AppContainer} from "./styles";
import {Column} from "./Column";
import {AddNewItem} from "./AddNewItem";
import {useAppState} from "./AppStateContext";
import CustomDragLayer from "./CustomDragLayer";


const App = () => {

    const {state, dispatch} = useAppState()

    return (
        <AppContainer>
            <CustomDragLayer/>
            {state.lists.map((list,i)=> (
                <Column id={list.id} text={list.text} key={list.id} index={i}/>
            ))}
            <AddNewItem onAdd={text => dispatch({type: "ADD_LIST", payload: text })}
                        toggleButtonText={"+ Add another list"}/>
        </AppContainer>
    );
}

export default App;
