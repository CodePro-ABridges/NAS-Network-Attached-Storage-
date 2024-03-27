import * as types from "../actions/authActions.js";
import fire from "../../config/firebase.js";

//email and password will be in payload
const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const logoutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

//action creator
//
export const signInUser = (email, password, setSuccess) => (dispatch) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        loginUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        }),
      );
      setSuccess(true);
    })
    .catch((error) => {
      console.log(error);
      alert("Invalid Credentials!");
    });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      fire
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(async () => {
          const currentUser = await fire.auth().currentUser;
          dispatch(
            loginUser({
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
            }),
          );

          //Work around for a redirect since I cannot use Nav
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") {
        alert("Email already in use!!");
      }
      if (error.code == "auth/invalid-email") {
        alert("Invalid email!!");
      }
      if (error.code == "auth/weak-password") {
        alert("Create a STRONG password !");
      }
    });
};

export const signOutUser = () => (dispatch) => {
  dispatch(logoutUser());
};
