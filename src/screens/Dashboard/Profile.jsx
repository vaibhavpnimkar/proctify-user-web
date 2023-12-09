import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Pencil, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  useEffect(() => {
    profileDeatils();
  }, []);
  const saveChanges = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/api/v1/student/updatedetails",
        { email, phoneno, name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Profile Updated");
      // navigate("/dashboard");
      // document.documentElement.requestFullscreen().then(() => {
      // navigate(`/dashboard/exam/${location.state.code}`);
      // });
    } catch (error) {
      console.error("error:", error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };
  const profileDeatils = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    try {
      const response = await axios.get(
        "http://127.0.0.1:3002/api/v1/student/getdetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data[0]);
      setName(response.data.data[0].name);
      setPhoneno(response.data.data[0].phoneno);
      setEmail(response.data.data[0].email);
      // navigate("/dashboard");
      // document.documentElement.requestFullscreen().then(() => {
      // navigate(`/dashboard/exam/${location.state.code}`);
      // });
    } catch (error) {
      console.error("error:", error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="max-w-full min-h-[90vh] w-[70%] mx-auto flex justify-start flex-col">
        <div className="flex justify-between items-center">
          <p className="mt-10 mb-6 font-semibold text-2xl">
            {editMode ? "Edit Profile" : "My Profile"}
          </p>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? <X /> : <Pencil />}
          </button>
        </div>
        {editMode ? (
          <form className="w-[50%]">
            <div className="mb-3">
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
                required
                value={name !== "" ? name : ""}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                required
                value={email !== "" ? email : ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
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
                required
                value={phoneno !== "" ? phoneno : ""}
                onChange={(e) => setPhoneno(e.target.value)}
                placeholder="Phone No."
              />
            </div>
            <button
              onClick={saveChanges}
              className="mt-4 px-4 rounded-md py-[6px] bg-blue-500 text-blue-100 hover:text-white hover:bg-blue-600 transition-all hover:transition-all duration-150 hover:duration-150 ease-out hover:ease-in"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <>
            <p className="my-2 text-lg">Name: {name}</p>
            <p className="my-2 text-lg">Email: {email}</p>
            <p className="my-2 text-lg">Phone No: {phoneno}</p>
          </>
        )}
      </section>
    </main>
  );
};

export default Profile;
