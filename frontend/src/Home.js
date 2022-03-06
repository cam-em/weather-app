import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, addUser } from "./redux/action";

const initialState = {
    name: "",
    email: "",
    city: "",
    state: "",
};

const Home = () => {
    const [info, setInfo] = useState(initialState)
    const dispatch = useDispatch();
    const { users, msg } = useSelector(state => state.data);

    const {name, email, city, state} = info;

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    useEffect(() => {
        if(msg) {
            toast.success(msg);
        }
    }, [msg]);

    const handleChange = (e) => {
        let {name, value} = e.target;
        setInfo({...info, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(info))
        setInfo(initialState)
    };

    return (
        <div>
            <Container style={{ marginTop: "70px" }}>
                <Row>
                    <Col m4={4}>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="E-mail"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={city}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={state}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-2">
                            <Button 
                            type="submit"
                            variant="primary"
                            size="lg"
                            >
                                Submit
                            </Button>
                        </div>
                        </Form>
                    </Col>
                    <Col m4={8}>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {users && users.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.city}</td>
                                        <td>{item.state}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button style={{marginRight: "5px"}} variant="danger">
                                                    Delete
                                                </Button>
                                                <Button variant="secondary">
                                                    Update
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;