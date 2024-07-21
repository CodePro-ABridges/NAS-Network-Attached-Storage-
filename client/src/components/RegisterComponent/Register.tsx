import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { registerUser } from "../../store/slices/userSlice.ts";
import { setError, clearError } from "../../store/slices/errorSlice.ts";
import AuthModal from "../ModalComponents/authModal/authModal.tsx";

const RegisterForm: React.FC = () => {
  //State
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  //redux
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const { message: errorMessage } = useAppSelector((state) => state.error);
  const navigate = useNavigate();

  //Handle Change in form.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Destructure objects from event.target.
    const { name, value } = e.target;

    //Updating state.
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //get objects from Form.
    const { email, username, password, passwordConfirmation } = registerForm;

    if (!email) {
      dispatch(setError("Email is required"));
      return;
    }
    if (!username) {
      dispatch(setError("Username is required"));
      return;
    }
    if (password !== passwordConfirmation) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    try {
      const resultAction = await dispatch(
        registerUser({ username, email, password }),
      );
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    } catch (err) {
      dispatch(setError("Registration failed"));
    }
  };

  return (
    <div className="w-screen h-screen flex top-0 justify-center items-center">
      {error && (
        <AuthModal
          message={errorMessage}
          onClose={() => dispatch(clearError())}
        />
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-neutral-700 w-3/4 sm:w-1/2 md:w-1/3">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-5 text-center">Register</h1>
          {/*Email div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Email</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={registerForm.email}
              onChange={handleChange}
            />
          </div>
          {/*name div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Username</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="text"
              name="username"
              placeholder="Enter the username"
              value={registerForm.username}
              onChange={handleChange}
            />
          </div>
          {/*Password div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="password"
              placeholder="Enter the password"
              value={registerForm.password}
              onChange={handleChange}
            />
          </div>
          {/*Password confirmation div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              value={registerForm.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          {/*Button submit div*/}
          <div className="text-center">
            <button
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 w-full"
              type="submit"
              disabled={loading === "pending"}
            >
              {loading === "pending" ? "Registering..." : "Register"}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
