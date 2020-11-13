// import { IStateAction, IInitialState } from "../../types";

const initialState = {
  token: "",
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
       return {...state, state: action.payload };
    default: return state;
  }
};

export default tokenReducer;
