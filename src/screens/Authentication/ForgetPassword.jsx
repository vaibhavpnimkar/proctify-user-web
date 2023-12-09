import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email) {
      toast.error("Email is required");
      return;
    }
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3002/api/v1/student/forgotpassword`,
        data
      );
      toast.success("Email sent!");
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
    setData({
      email: "",
    });
  };

  const setValueHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex justify-center min-h-[90vh] items-center w-full bg-blue-50">
      <div className="my-10 w-[40%] bg-white flex justify-center items-center flex-col py-6 px-5 shadow-md rounded-md">
        <p className="text-2xl font-semibold my-6">Reset Password</p>
        <div className="w-full">
          <form className="bg-white px-8 mb-4">
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
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[60%]"
                type="submit"
                onClick={handleSubmit}
              >
                Send Reset Link
              </button>
            </div>
            <Link to={"/"}>
              <p className="text-sm hover:underline cursor-pointer mt-3 flex justify-center items-center">
                Remembered the Password?
              </p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
