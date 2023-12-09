import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import toast from "react-hot-toast";
import ExamShowCard from "../../components/ExamShowCard";
import axios from "axios";
import { Oval } from "react-loader-spinner";
const RegisteredExam = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const examCodeCheckHandler = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:3002/api/v1/student/getregisteredexam`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExamData(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };
  useEffect(() => {
    examCodeCheckHandler();
  }, []);
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="w-[80%] min-h-[90vh] flex justify-start items-center flex-col mt-10">
        {/* <div className="flex justify-center items-stretch my-10 w-[40%]">
          <form className="flex">
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
              id="examcode"
              type="text"
              name="examcode"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              placeholder="Exam Code"
              required
            />
            <button
              className="bg-blue-600 text-white px-6 rounded-tr rounded-br transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 flex justify-center items-center text-lg"
              type="submit"
              onClick={examCodeCheckHandler}
            >
              {loading && (
                <Oval
                  height={20}
                  width={20}
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="white"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              )}
              {!loading && <Search size={22} />}
            </button>
          </form>
        </div> */}
        {loading && (
          <Oval
            height={50}
            width={50}
            color="white"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="white"
            strokeWidth={4}
            className="mt-10"
            strokeWidthSecondary={4}
          />
        )}
        {!loading &&
          examData?.length !== 0 &&
          examData.map((exam) => {
            return (
              <ExamShowCard
                key={exam.examcode}
                type="registered"
                data={{
                  code: exam.examcode,
                  name: exam.exam_name,
                  date: exam.startdate,
                  time: exam.starttime,
                  negative_marks: exam.negative_marks,
                  question_weightage: exam.question_weightage,
                  duration: exam.duration,
                  details: exam.details,
                }}
              />
            );
          })}
        {!loading && examData.length === 0 && (
          <p className="mt-10">You Haven't Registered For Any Exam!</p>
        )}
      </section>
    </main>
  );
};

export default RegisteredExam;
