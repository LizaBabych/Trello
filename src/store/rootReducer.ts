import { combineReducers } from "redux";
import isLoginReducer from "./reducers/isLoginReducer";

const rootReducer = combineReducers({
  isLoginReducer,
});

export default rootReducer;
