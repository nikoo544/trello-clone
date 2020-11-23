import React from "react";
import {Navbar} from "react-bootstrap";
import styled from 'styled-components'

const Styles = styled.div`
.navbar {
    background-color:#245C8C;
    display: block;
    color: #FF0000
}
`

export const NavigationBar = () => {

    return (
        <Styles>
            <Navbar expand="lg">

                <Navbar.Brand href="/" className="text-light"> 🏺 Troya Board </Navbar.Brand>
            </Navbar>
        </Styles>
    )
}
