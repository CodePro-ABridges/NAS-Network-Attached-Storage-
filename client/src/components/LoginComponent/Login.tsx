import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { loginUser } from "../../store/slices/userSlice.ts";
import { setError, clearError } from "../../store/slices/errorSlice.ts";
import AuthModal from "../ModalComponents/authModal/authModal.tsx";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  return (
    <div className="w-screen h-screen flex top-0 fixed justify-center items-center">
      {error && (
        <AuthModal message={error} onClose={() => dispatch(clearError())} />
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-neutral-700 w-3/4 sm:w-1/2 md:w-1/3">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-5 text-center">Login</h1>
          {/*Email div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Email</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="email"
              name="email"
              value={email}
              placeholder="Enter the email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/*Password div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="password"
              value={password}
              placeholder="Enter the password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*button div*/}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 w-full"
              disabled={loading === "pending"}
            >
              {loading === "pending" ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-500 hover:underline">
              Click here to create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
