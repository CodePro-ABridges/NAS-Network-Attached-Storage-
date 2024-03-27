import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../redux/actionCreators/authActionCreator";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [success, setSuccess] = useState("");

  //redux dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //conditional for registering
    if (!name || !email || !password || !passwordConfirmation) {
      alert("REQUIRED: FIll ALL FIELDS");
      return;
    }
    if (password != passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    dispatch(signUpUser(name, email, password, setSuccess));
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
      <h1 className="text-5xl font-semibold text-center">Register</h1>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Name</label>
          <input
            type="name"
            name="name"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <input
            type="password"
            name="passwordConfirmation"
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Re-type password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-400 text-white text-lg font-bold"
          >
            Register
          </button>
        </div>
        <div className="mt-3 justify-self-center">
          <Link to="/login" className="text-center">
            Already registered? Click HERE
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
