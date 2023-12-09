import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";

const ResetPassword = () => {
  const [data, setData] = useState({
    currentpassword: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.currentpassword || !data.password || !data.confirmpassword) {
      toast.error("Enter all Fields!");
      return;
    } else if (data.password !== data.confirmpassword) {
      toast.error("Enter same password in password and confirm password");
    } else {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://127.0.0.1:3002/api/v1/student/resetpassword",
          {
            password: data.currentpassword,
            newpassword: data.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        toast.success("Reset successful!");
      } catch (err) {
        console.log(err.response.data.msg);
        toast.error(err.response.data.msg);
      }
    }
    setData({
      currentpassword: "",
      password: "",
      confirmpassword: "",
    });
  };

  const setValueHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="max-w-full min-h-[90vh] w-[70%] mx-auto flex justify-start items-start flex-col">
        <p className="text-2xl font-semibold mb-6 mt-8 text-center">
          Reset Password
        </p>
        <form className="pt-6 mb-4 w-[50%]">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="currentpassword"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="currentpassword"
              type="password"
              name="currentpassword"
              value={data.currentpassword}
              onChange={setValueHandler}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={setValueHandler}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              value={data.confirmpassword}
              onChange={setValueHandler}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700"
              type="submit"
              onClick={handleSubmit}
            >
              Change Password
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ResetPassword;
