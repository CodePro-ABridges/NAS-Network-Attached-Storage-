import * as types from "../actions";
//email and password will be in payload
const loginUser = (payload) => {
  return {
    type: types.LOGIN_USER,
    payload,
  };
};

const registerUser = (payload) => {
  return{
    type; types.REGISTER_USER,
    payload,
  };
};

const logoutUser = (payload) => {
  return{
    type: types.SIGN_OUT_USER,
  }
}

//action creator
//
export const signInUser = (email, password) => (dispatch) => {
  console.log(email, password);
};

export const signUpUser = (name, email, password) => (dispatch) => {
  console.log(name, email, password);
}

export const signOutUser = () => (dispatch) => {
  dispatch(logoutUser());
}
