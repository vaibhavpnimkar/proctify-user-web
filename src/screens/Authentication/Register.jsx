import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
  });
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:3002/api/v1/student/emailverification`,
        data
      );
      console.log(response);
      toast.success("Verification Mail Send!");
      navigate("/verify-register", {
        state: { data, otp: response.data.otp },
      });
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }

    setData({
      name: "",
      email: "",
      phoneno: "",
      password: "",
    });
  };

  const setValueHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex justify-center min-h-[90vh] items-center w-full bg-blue-50">
      <div className="my-10 w-[40%] bg-white flex justify-center items-center flex-col py-6 px-5 shadow-md rounded-md">
        <p className="text-2xl font-semibold my-6">Register Your Account</p>
        <div className="w-full">
          <form className="bg-white px-8 pt-6 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={setValueHandler}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={setValueHandler}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="phoneno"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneno"
                type="number"
                name="phoneno"
                value={data.phoneno}
                onChange={setValueHandler}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={setValueHandler}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[50%]"
                type="submit"
                onClick={handleSubmit}
              >
                Register Now
              </button>
            </div>
            <Link to={"/"}>
              <p className="text-sm hover:underline cursor-pointer mt-5 flex justify-center items-center">
                Already have an account? Login!
              </p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
