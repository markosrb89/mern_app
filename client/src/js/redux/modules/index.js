import { combineReducers } from "redux";
import {reducer as toastrReducer} from "react-redux-toastr";

import user from "./user";
import items from "./items";

export default combineReducers({
    toastr: toastrReducer,
    user,
    items
});