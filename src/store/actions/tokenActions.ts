// import { SET_STATE, TStateTodo, IStateAction } from "../../types";

export const setToken = (state) => {
  return {
    type: "SET_TOKEN",
    payload: state,
  };
};
