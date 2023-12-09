import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ResultShowCard from "../../components/ResultShowCard";
import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const Result = () => {
  const [active, setActive] = useState(false);
  const [result, setResult] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    code: "",
    marks: "",
    average: "",
    maxmarks: "",
    minmarks: "",
  });
  useEffect(() => {
    handleSubmit();
  }, []);
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:3002/api/v1/student/getresult`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setResult(response.data.data);
      // localStorage.setItem("token", response.data.token);
      // toast.success("Login successful!");
      // navigate("/dashboard");
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
    // if (!data.email || !data.password) {
    //   toast.error("Email and password are required");
    //   return;
    // }
    // setData({
    //   email: "",
    //   password: "",
    // });
  };
  const handleClick = async (exam_name, examcode) => {
    setActive(true);
    const token = localStorage.getItem("token");
    let response;
    try {
      // console.log('examcode:',examcode);
      response = await axios.get(
        `http://127.0.0.1:3002/api/v1/student/getexamresult/${examcode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      // setResult(response.data.data);
      // localStorage.setItem("token", response.data.token);
      // toast.success("Login successful!");
      // navigate("/dashboard");
    } catch (err) {
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
    setDetails({
      name: exam_name,
      code: examcode,
      marks: response.data.data.marks,
      average: response.data.data.avg,
      maxmarks: response.data.data.max,
      minmarks: response.data.data.min,
      percentage:response.data.data.percentage,
      cutoff:response.data.data.cutoff,
      status:response.data.data.status,
    });
  };
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="w-[80%] min-h-[90vh] flex justify-start items-center flex-col">
        <p className="my-8 font-bold text-3xl">Results</p>
        {active && (
          <div className="w-[100vw] h-[100vh] bg-black/70 absolute top-0 left-0 z-20 flex justify-center items-center">
            <div className="w-[45%] bg-white px-8 py-4 rounded border flex justify-start items-center flex-col">
              <div class="mt-2 mb-3 flex justify-between items-center w-full">
                <p class="font-bold text-2xl text-left my-2">Result</p>
                <button onClick={() => setActive(false)}>
                  <X />
                </button>
              </div>
              <table class="w-full border border-gray-300">
                <tr>
                  <th class="bg-gray-200 p-2 border">Field</th>
                  <th class="bg-gray-200 p-2 border">Details</th>
                </tr>
                <tr>
                  <td class="p-2 border">Subject</td>
                  <td class="p-2 border">{details.name}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Code</td>
                  <td class="p-2 border">{details.code}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Marks</td>
                  <td class="p-2 border">{details.marks}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Average</td>
                  <td class="p-2 border">{details.average}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Min Marks</td>
                  <td class="p-2 border">{details.minmarks}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Max Marks</td>
                  <td class="p-2 border">{details.maxmarks}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Percentage</td>
                  <td class="p-2 border">{details.percentage}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Cut Off</td>
                  <td class="p-2 border">{details.cutoff}</td>
                </tr>
                <tr>
                  <td class="p-2 border">Status</td>
                  <td class="p-2 border">{details.status}</td>
                </tr>
              </table>
            </div>
          </div>
        )}
        <div className="w-full grid gap-y-5 place-items-center">
          {result.map((res) => {
            return (
              <ResultShowCard
                key={res.exam_name}
                onClick={() => handleClick(res.exam_name, res.examcode)}
                data={{
                  code: res.examcode,
                  name: res.exam_name,
                  date: res.startdate.split("T")[0],
                  published: res.publish_result,
                }}
              />
            );
          })}
          {/* <ResultShowCard
            onClick={() => setActive(true)}
            data={{
              code: "11239r3",
              name: "Web Development With ReactJs",
              questions: 20,
              date: "1st September 2023",
              time: "9:30 AM",
              published: true,
            }}
          />
          <ResultShowCard
            data={{
              code: "11239r3",
              name: "Web Development With ReactJs",
              questions: 20,
              date: "1st September 2023",
              time: "9:30 AM",
              published: false,
            }}
          /> */}
        </div>
      </section>
    </main>
  );
};

export default Result;
