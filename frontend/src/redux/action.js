import * as types from "./actionType";
import axios from "axios";

const API = "http://localhost:5000";

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const getSingleUser = (users) => ({
    type: types.GET_SINGLE_USER,
    payload: users
});

const userAdded = (msg) => ({
    type: types.ADD_USER,
    payload: msg
});

const userDelete = (msg) => ({
    type: types.DELETE_USER,
    payload: msg
});

const userUpdate = (msg) => ({
    type: types.UPDATE_USER,
    payload: msg
});

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

export const deleteUser = (id) => {
    return function(dispatch) {
        axios
        .delete(`${API}/users/${id}`)
        .then((response) => {
            dispatch(userDelete(response.data.msg));
            dispatch(loadUsers());
        })
        .catch((err) => console.log(err));
    };
};

export const loadSingleUser = (id) => {
    return function(dispatch) {
        axios
        .get(`${API}/user/${id}`)
        .then((response) => {
            dispatch(getSingleUser(response.data));
        })
        .catch((err) => console.log(err));
    };
};

export const updateUser = (user, id) => {
    return function(dispatch) {
        axios
        .put(`${API}/users/${id}`, user)
        .then((response) => {
            dispatch(userUpdate(response.data.msg));
            dispatch(loadUsers());
        })
        .catch((err) => console.log(err));
    };
};