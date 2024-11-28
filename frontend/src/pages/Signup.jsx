import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2

const Signup = () => {
  const [Data, setData] = useState({ username: "", email: "", password: "", address: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      history("/"); // Redirect to home page if already logged in
    }
  }, [isLoggedIn, history]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "" || Data.address === "") {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'All fields are required!',
        });
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-up",
          Data
        );
        setData({ username: "", email: "", password: "", address: "" }); // Clear fields after submission
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: 'Welcome aboard.',
        }).then(() => {
          history("/login"); // Redirect to login page after successful signup
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response.data.message,
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-8"
      style={{
        backgroundImage: `url('/login.jpg')`,
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-pink-700 bg-opacity-60 rounded-lg p-8 w-full max-w-md shadow-lg backdrop-blur-md">
        <p className="text-white text-3xl font-bold mb-6 text-center">Sign Up</p>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full bg-gray-700 bg-opacity-40 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Username"
              name="username"
              required
              value={Data.username}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-700 bg-opacity-40 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
              placeholder="Email"
              name="email"
              required
              value={Data.email}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-gray-800 bg-opacity-40 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
              placeholder="Password"
              name="password"
              required
              value={Data.password}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-white mb-1">
              Address
            </label>
            <textarea
              id="address"
              className="w-full bg-gray-700 bg-opacity-40 text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              rows="4"
              placeholder="Address"
              name="address"
              required
              value={Data.address}
              onChange={change}
            />
          </div>
          <div>
            <button
              className="w-full bg-purple-500 text-white py-3 rounded font-bold hover:bg-purple-600 transition duration-300"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-white mt-4">Or</p>
          <p className="text-center text-white mt-4">
            Already have an account?&nbsp;
            <Link to="/login" className="text-purple-300 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
