import * as types from "./actionType"

const initialState = {
    users:[],
    user: {},
    msg: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case types.ADD_USER:
            return {
                ...state,
                msg: action.payload
            }
        default:
            return state;
    }
}

export default userReducer