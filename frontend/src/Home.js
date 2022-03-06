import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, addUser, deleteUser, loadSingleUser, updateUser } from "./redux/action";

const initialState = {
    name: "",
    email: "",
    city: "",
    state: "",
};

const Home = () => {
    const [info, setInfo] = useState(initialState)
    const [updateActive, setUpdateActive] = useState(false)
    const [userId, setUserId] = useState("")
    const dispatch = useDispatch();
    const { users, msg, user } = useSelector(state => state.data);

    const {name, email, city, state} = info;

    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    useEffect(() => {
        if(msg) {
            toast.success(msg);
        }
    }, [msg]);

    useEffect(() => {
        if(user) {
            setInfo({...user})
        }
    }, [user])

    const handleChange = (e) => {
        let {name, value} = e.target;
        setInfo({...info, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !email || !city || !state) {
            toast.error("Please fill all input fields")
        } else {
            if(!updateActive) {
                dispatch(addUser(info))
            } else {
                dispatch(updateUser(info, userId))
                setUpdateActive(false)
                setUserId("")
            }

            setInfo(initialState)
        }
    };

    const handleDelete = (user) => {
        if(window.confirm(`Are you sure you want to delete ${user.name}?`)) {
           dispatch(deleteUser(user._id)) ;
        }
    }

    const handleUpdate = (id) => {
        dispatch(loadSingleUser(id));
        setUpdateActive(true)
        setUserId(id)
    }

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
                            value={name || ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="E-mail"
                            name="email"
                            value={email || ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="City"
                            name="city"
                            value={city || ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="State"
                            name="state"
                            value={state || ""}
                            onChange={handleChange}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2 mt-2">
                            <Button 
                            type="submit"
                            variant="primary"
                            size="lg"
                            >
                                {updateActive ? "Update" : "Submit"}
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
                            {users && users.map((user, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.city}</td>
                                        <td>{user.state}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button 
                                                style={{marginRight: "5px"}} 
                                                variant="danger"
                                                onClick={() => handleDelete(user)}
                                                >
                                                    Delete
                                                </Button>
                                                <Button 
                                                variant="secondary"
                                                onClick={() => handleUpdate(user._id)}
                                                >
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