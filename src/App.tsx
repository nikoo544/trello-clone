import React from 'react';
import {AppContainer} from "./styles";
import {Column} from "./Column";
import {Card} from "./Card";
import {AddNewItem} from "./AddNewItem";


function App() {
    return (
        <AppContainer>
            <Column text="To Do">
                <Card text={"Generate app scaffold"}></Card>
            </Column>
            <Column text="In Progress">
                <Card text={"Learn Typescript"}></Card>
            </Column>
            <Column text="Done">
                <Card text={"Begin to use static typing"}></Card>
            </Column>
            <AddNewItem onAdd={console.log} toggleButtonText={"+ Add another list"}/>
        </AppContainer>
    );
}

export default App;
