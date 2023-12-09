import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ExamShowCard = (props) => {
  const checkExamhandler = async (e) => {
    e.preventDefault();
    if (props.data.code) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:3002/api/v1/student/cangiveexam/${props.data.code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/dashboard/instructions`, {
          state: {
            code: props.data.code,
            name: props.data.name,
            duration: props.data.duration,
            negative_marks: props.data.negative_marks,
            question_weightage: props.data.question_weightage,
          },
        });
      } catch (error) {
        console.log(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  const registerExamHandler = () => {
    navigate(`/dashboard/registerexam/${props.data.code}`, {
      state: {
        code: props.data.code,
        name: props.data.name,
        duration: props.data.duration,
        negative_marks: props.data.negative_marks,
        question_weightage: props.data.question_weightage,
        details: props.data.details,
        date: props.data.startdate,
        time: props.data.starttime,
      },
    });
  };

  const navigate = useNavigate();
  return (
    <div className="w-[85%] bg-white shadow-md border rounded-md p-4 flex justify-between items-end cursor-pointer mb-5">
      <div>
        <p className="font-semibold mb-1 text-lg">
          {props?.data?.code} - {props?.data?.name}
        </p>
        <p className="text-sm mr-2 mb-1">
          Date: {props?.data?.date?.split("T")[0]}
        </p>
        <p className="text-sm mr-2">Time: {props.data.time}</p>
      </div>
      <div>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-md my-3 transition_fade hover:shadow-lg text-sm hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700"
          onClick={
            props.type === "registered" ? checkExamhandler : registerExamHandler
          }
        >
          {props.type === "registered" ? "Give Exam" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default ExamShowCard;
