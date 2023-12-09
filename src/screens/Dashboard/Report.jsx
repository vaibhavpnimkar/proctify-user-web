import React, { useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
const Report = () => {
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      toast.dismiss();
      toast.error("Enter All Fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      // console.log('examcode:',examcode);
      console.log(data);
      const response = await axios.post(
        `http://127.0.0.1:3002/api/v1/student/reportproblem`,
        { description: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Problem Submitted Successful!");
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
    setData("");
  };

  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="flex justify-center h-[90vh] items-start w-[80%]">
        <div className="my-10 w-[50%] flex justify-center items-center flex-col py-6 px-5 rounded-md">
          <p className="text-2xl font-semibold my-3">Report A Problem</p>
          <div className="w-full">
            <form className=" px-8 pt-6 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="problem"
                >
                  Problem
                </label>
                <textarea
                  name="problem"
                  id="problem"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none text-sm"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Explain problem"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[50%]"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Report;
