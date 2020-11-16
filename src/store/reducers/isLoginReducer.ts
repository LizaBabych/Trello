let initialState;

if (localStorage.getItem('token')) {
  initialState = {
    isLogin: 1,
  }
} else {
  initialState = {
    isLogin: 0,
  }
}

const isLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
       return {...state, isLogin: action.payload };
    default: return state;
  }
};

export default isLoginReducer;
