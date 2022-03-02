import React from 'react';
import { Navbar } from 'react-bootstrap';

const Layout = () => {
    return(
        <Navbar bg="primary" variant="dark" className="justify-content-center">
            <Navbar.Brand>Weather App</Navbar.Brand>
        </Navbar>
    )
}

export default Layout;