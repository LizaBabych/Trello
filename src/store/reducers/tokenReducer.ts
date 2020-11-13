// import { IStateAction, IInitialState } from "../../types";

const initialState = {
  token: 0,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
       return {...state, token: action.payload };
    default: return state;
  }
};

export default tokenReducer;
