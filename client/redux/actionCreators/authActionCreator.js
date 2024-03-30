import * as types from "../actions/authActions.js";
import fire from "../../config/firebase.js";

// Actions
const loginUser = (payload) => ({
  type: types.SIGN_IN,
  payload,
});

const logoutUser = () => ({
  type: types.SIGN_OUT,
});

// Action Creators
export const signInUser = (email, password, setSuccess) => async (dispatch) => {
  try {
    const userCredential = await fire
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(
      loginUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      }),
    );
    setSuccess(true);
  } catch (error) {
    console.error(error);
    alert("Invalid Credentials!");
  }
};

export const signUpUser =
  (name, email, password, setSuccess) => async (dispatch) => {
    try {
      const userCredential = await fire
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName: name,
      });
      const currentUser = fire.auth().currentUser;
      dispatch(
        loginUser({
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
        }),
      );
      setSuccess(true);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use!!");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email!!");
      } else if (error.code === "auth/weak-password") {
        alert("Create a STRONG password!");
      }
    }
  };

export const signOutUser = () => async (dispatch) => {
  try {
    await fire.auth().signOut();
    dispatch(logoutUser());
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export const checkIsLoggedIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      );
    }
  });
};
