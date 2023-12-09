import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import ExamShowCard from "../../components/ExamShowCard";
const AllExams = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const examCodeCheckHandler = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:3002/api/v1/student/getallexams`,
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
      console.log(error);
      //   toast.error(error.response.data.msg);
    }
  };
  useEffect(() => {
    examCodeCheckHandler();
  }, []);
  return (
    <main className="flex items-start">
      <Sidebar />
      <section className="w-[80%] min-h-[90vh] flex justify-start items-center flex-col my-10">
        {loading && (
          <Oval
            height={25}
            width={25}
            color="#192c65"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="white"
            strokeWidth={4}
            strokeWidthSecondary={4}
            className="mt-10"
          />
        )}
        {!loading &&
          examData?.length !== 0 &&
          examData.map((exam) => {
            return (
              <ExamShowCard
                key={exam.examcode}
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
          <p className="mt-10">No Exams Available Now!</p>
        )}
      </section>
    </main>
  );
};

export default AllExams;
