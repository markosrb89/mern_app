import { send } from "../../libs/services/api";

// Actions
const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";

// Reducer
const initialState = {
    loading: false,
    data: []
};

export default function contact(state = initialState, action = {}) {
    switch (action.type) {
        case SEND_EMAIL_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case SEND_EMAIL_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.json
            });
        case SEND_EMAIL_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state;
    }
};

// Action creators
export function sendEmail(name, email, message) {
    return dispatch => {
        dispatch(sendEmailRequest());
        return send(name, email, message)
            .then(json => dispatch(sendEmailSuccess(json)));
    };
}

function sendEmailRequest() {
    return {
        type: SEND_EMAIL_REQUEST
    };
}

function sendEmailSuccess(json) {
    return {
        type: SEND_EMAIL_SUCCESS,
        json
    };
}