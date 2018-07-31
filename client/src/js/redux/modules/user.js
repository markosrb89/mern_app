import { login, createUser } from "../../libs/resources/user";

// Actions
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const LOGOUT = "LOGOUT";

const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";

const initialState = {
    loading: false,
    isLoggedIn: false,
    user: undefined
};

// Reducer
export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                loading: false
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isLoggedIn: true,
                user: action.json.user
            });
        case LOGOUT:
            return Object.assign({}, state, {
                loading: false,
                isLoggedIn: false,
                user: undefined
            });
        case CREATE_USER_REQUEST:
            return Object.assign({}, state, {
                loading: false
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isLoggedIn: true,
                user: action.json.user
            });
        default:
            return state;
    }
}

// Action creators
export function onLogin(email, password) {
    return dispatch => {
        dispatch(onLoginRequest());
        return login(email, password)
            .then(json => dispatch(onLoginSuccess(json)));
    };
}

function onLoginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}

function onLoginSuccess(json) {
    return {
        type: LOGIN_SUCCESS,
        json
    }
}

export function onLogout() {
    return {
        type: LOGOUT
    };
}

export function onCreateUser(credentials) {
    return dispatch => {
        dispatch(onCreateUserRequest());
        return createUser(credentials)
            .then(json => dispatch(onCreateUserSuccess(json)));
    };
}

function onCreateUserRequest() {
    return {
        type: CREATE_USER_REQUEST
    }
}

function onCreateUserSuccess(json) {
    return {
        type: CREATE_USER_SUCCESS,
        json
    }
}