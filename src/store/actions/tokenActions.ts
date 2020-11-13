// import { SET_STATE, TStateTodo, IStateAction } from "../../types";

export const setToken = (state: any) => {
  return {
    type: "SET_TOKEN",
    payload: state,
  };
};
