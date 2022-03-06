import React from 'react';
import { Navbar } from 'react-bootstrap';

const Layout = (props) => {
    return(
        <>
            <Navbar bg="primary" variant="dark" className="justify-content-center">
                <Navbar.Brand>Weather App</Navbar.Brand>
            </Navbar>
            <div>{props.children}</div>
        </>
    )
}

export default Layout;