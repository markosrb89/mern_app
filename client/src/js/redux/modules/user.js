import User, { login, createUser } from "../../libs/resources/user";
import Auth from "../../libs/services/auth";

// Actions
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const LOGOUT = "LOGOUT";

const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";

const initialState = {
    loading: false,
    isLoggedIn: false,
    data: undefined
};

// Reducer
export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isLoggedIn: true,
                data: action.json
            });
        case LOGOUT:
            return Object.assign({}, state, {
                loading: false,
                isLoggedIn: false,
                data: undefined
            });
        case CREATE_USER_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isLoggedIn: true,
                data: action.json
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
            .then(json => {
                Auth.authenticateUser(json.token);
                dispatch(onLoginSuccess(json));
            });
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
    User.logOut();
    return dispatch => {
        return dispatch(onLogoutSuccess());  
    };
}

function onLogoutSuccess() {
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