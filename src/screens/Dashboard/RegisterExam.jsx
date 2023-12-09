import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formField, setFormField] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    if (!location.state) {
      navigate("/dashboard");
    } else {
      const initialData = {};
      JSON.parse(location.state.details).forEach((item) => {
        initialData[item.name] = "";
      });
      setData(initialData);
      setFormField(JSON.parse(location.state.details));
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      toast.dismiss();
      toast.error("Enter All Fields");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      console.log(data);
      const response = await axios.post(
        `http://127.0.0.1:3002/api/v1/student/registerexam/${location.state.code}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Registered Successful!");
      navigate("/dashboard/registered-exams");
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
    setData("");
  };

  const setValueHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="w-[80%] min-h-[90vh] flex justify-start items-center flex-col">
        <p className="text-2xl font-semibold my-8">Register For Exam</p>
        <div className="w-[80%]">
          <form className="bg-white px-8 pt-6 mb-4 w-full">
            <div className="w-full flex gap-x-10 gap-y-4 flex-wrap justify-start items-center">
              {formField &&
                formField.map((field, index) => {
                  return (
                    <div className="w-[40%]" key={index}>
                      <label
                        className="block text-gray-700 text-sm font-semibold mb-2"
                        htmlFor="email"
                      >
                        {field.name}
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        value={data[field.name]}
                        onChange={setValueHandler}
                        required
                      />
                    </div>
                  );
                })}
            </div>
            <div className="flex items-center justify-center w-full mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[30%]"
                type="submit"
                onClick={handleSubmit}
              >
                Register Exam
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
