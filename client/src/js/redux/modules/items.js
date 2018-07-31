import { getItems, createItem, deleteItem, updateItem } from "../../libs/services/api";

// Actions
const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST";
const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
const FETCH_ITEMS_FAILED = "FETCH_ITEMS_FAILED";

const CREATE_ITEM_REQUEST = "CREATE_ITEM_REQUEST";
const CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS";
const CREATE_ITEM_FAILED = "CREATE_ITEM_FAILED";

const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
const DELETE_ITEM_FAILED = "DELETE_ITEM_FAILED";

const UPDATE_ITEM_REQUEST = "UPDATE_ITEM_REQUEST";
const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
const UPDATE_ITEM_FAILED = "UPDATE_ITEM_FAILED";

// Reducer
const initialState = {
    loading: false,
    items: []
};

export default function items(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_ITEMS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case FETCH_ITEMS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                items: action.items
            });
        case FETCH_ITEMS_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        case CREATE_ITEM_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case CREATE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                items: [...state, action.json]
            });
        case CREATE_ITEM_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        case DELETE_ITEM_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case DELETE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                items: state.items.filter(item => item.id !== action.json.id)
            });
        case DELETE_ITEM_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        case UPDATE_ITEM_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case UPDATE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                items: state.items.map(item => {
                    if (item.id === action.json.item.id) {
                        return {
                            ...state.item,
                            ...action.json.item
                        }
                    }
                })
            });
        case UPDATE_ITEM_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state;
    }
};

// Action creators
export function onGetItems() {
    return dispatch => {
        dispatch(getItemsRequest());
        return getItems()
            .then(json => dispatch(getItemsSuccess(json)));
    };
}

function getItemsRequest() {
    return {
        type: FETCH_ITEMS_REQUEST
    };
}

function getItemsSuccess(json) {
    return {
        type: FETCH_ITEMS_SUCCESS,
        json
    };
}

export function onCreateItem(name, price) {
    return dispatch => {
        dispatch(onCreateItemRequest());
        return createItem(name, price)
            .then(json => dispatch(onCreateItemSuccess(json)));
    };
}

function onCreateItemRequest() {
    return {
        type: CREATE_ITEM_REQUEST
    }
}

function onCreateItemSuccess(json) {
    return {
        type: CREATE_ITEM_SUCCESS,
        json
    }
}

export function onDeleteItem(id) {
    return dispatch => {
        dispatch(onDeleteItemRequest());
        return deleteItem(id)
            .then(json => dispatch(onDeleteItemSuccess(json)));
    };
}

function onDeleteItemRequest() {
    return {
        type: DELETE_ITEM_REQUEST
    }
}

function onDeleteItemSuccess(json) {
    return {
        type: DELETE_ITEM_SUCCESS,
        json
    }
}

export function onUpdateItem(id) {
    return dispatch => {
        dispatch(onUpdateItemRequest());
        return updateItem(id)
            .then(json => dispatch(onUpdateItemSuccess(json)));
    };
}

function onUpdateItemRequest() {
    return {
        type: UPDATE_ITEM_REQUEST
    }
}

function onUpdateItemSuccess(json) {
    return {
        type: UPDATE_ITEM_SUCCESS,
        json
    }
}
