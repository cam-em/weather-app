import * as types from "./actionType";
import axios from "axios";

const API = "http://localhost:5000";

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const userAdded = (msg) => ({
    type: types.ADD_USER,
    payload: msg
})

export const loadUsers = () => {
    return function(dispatch) {
        axios
        .get(`${API}/users`)
        .then((response) => dispatch(getUsers(response.data)))
        .catch((err) => console.log(err));
    };
};

export const addUser = (user) => {
    return function(dispatch) {
        axios
        .post(`${API}/user`, user)
        .then((response) => {
            dispatch(userAdded(response.data.msg));
            dispatch(loadUsers());
        })
        .catch((err) => console.log(err));
    };
};