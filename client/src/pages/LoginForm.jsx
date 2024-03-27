import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../redux/actionCreators/authActionCreator";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  //State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  //redux dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle submitform
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(signInUser(email, password));
  };

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200"
    >
      <h1 className="text-5xl font-semibold text-center">Welcome Back</h1>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-400 text-white text-lg font-bold"
          >
            Sign in
          </button>
        </div>
        <div className="mt-3 justify-self-center">
          <Link to="/register" className="text-center">
            Not registered? Click HERE
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
