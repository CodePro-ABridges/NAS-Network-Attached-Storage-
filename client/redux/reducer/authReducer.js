const initState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "SIGN_OUT_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
