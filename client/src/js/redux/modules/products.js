import { getProducts, createProduct, deleteProduct, updateProduct } from "../../libs/services/api";

// Actions
const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
const FETCH_PRODUCTS_FAILED = "FETCH_PRODUCTS_FAILED";

const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
const CREATE_PRODUCT_FAILED = "CREATE_PRODUCT_FAILED";

const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
const DELETE_PRODUCT_FAILED = "DELETE_PRODUCT_FAILED";

const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
const UPDATE_PRODUCT_FAILED = "UPDATE_PRODUCT_FAILED";

// Reducer
const initialState = {
    loading: false,
    data: []
};

export default function products(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case FETCH_PRODUCTS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: action.json
            });
        case FETCH_PRODUCTS_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        case CREATE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case CREATE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: [...state, action.json]
            });
        case CREATE_PRODUCT_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        case DELETE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case DELETE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: state.data.filter(product => product.id !== action.json.id)
            });
        case DELETE_PRODUCT_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        case UPDATE_PRODUCT_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case UPDATE_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                data: state.data.map(product => {
                    if (product.id === action.json.product.id) {
                        return {
                            ...state.product,
                            ...action.json.product
                        }
                    }
                })
            });
        case UPDATE_PRODUCT_FAILED:
            return Object.assign({}, state, {
                loading: true
            });
        default:
            return state;
    }
};

// Action creators
export function onGetProducts() {
    return dispatch => {
        dispatch(onGetProductsRequest());
        return getProducts()
            .then(json => dispatch(onGetProductsSuccess(json)));
    };
}

function onGetProductsRequest() {
    return {
        type: FETCH_PRODUCTS_REQUEST
    };
}

function onGetProductsSuccess(json) {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        json
    };
}

export function onCreateProduct(name, price) {
    return dispatch => {
        dispatch(onCreateProductRequest());
        return createProduct(name, price)
            .then(json => dispatch(onCreateProductSuccess(json)));
    };
}

function onCreateProductRequest() {
    return {
        type: CREATE_PRODUCT_REQUEST
    }
}

function onCreateProductSuccess(json) {
    return {
        type: CREATE_PRODUCT_SUCCESS,
        json
    }
}

export function onDeleteProduct(id) {
    return dispatch => {
        dispatch(onDeleteProductRequest());
        return deleteProduct(id)
            .then(json => dispatch(onDeleteProductSuccess(json)));
    };
}

function onDeleteProductRequest() {
    return {
        type: DELETE_PRODUCT_REQUEST
    }
}

function onDeleteProductSuccess(json) {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        json
    }
}

export function onUpdateProduct(id) {
    return dispatch => {
        dispatch(onUpdateProductRequest());
        return updateProduct(id)
            .then(json => dispatch(onUpdateProductSuccess(json)));
    };
}

function onUpdateProductRequest() {
    return {
        type: UPDATE_PRODUCT_REQUEST
    }
}

function onUpdateProductSuccess(json) {
    return {
        type: UPDATE_PRODUCT_SUCCESS,
        json
    }
}