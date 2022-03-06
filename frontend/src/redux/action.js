import * as types from "./actionType";
import axios from "axios";

const API = "http://localhost:5000";

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

export const loadUsers = () => {
    return function(dispatch) {
        axios
        .get(`${API}/users`)
        .then((response) => dispatch(getUsers(response.data)))
        .catch((err) => console.log(err));
    };
};