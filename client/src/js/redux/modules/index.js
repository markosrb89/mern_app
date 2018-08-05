import { combineReducers } from "redux";
import {reducer as toastrReducer} from "react-redux-toastr";

import user from "./user";
import products from "./products";

export default combineReducers({
    toastr: toastrReducer,
    user,
    products
});