import React, { useEffect } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "./redux/action";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch])

    return (
        <div>
            Home Page
        </div>
    )
}

export default Home;