import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useRef, useState } from "react";
import OptionCard from "./OptionCard";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";

const ExamCard = (props) => {
 const webcamRef = useRef(null);
  const [quePointer, setQuePointer] = useState(0);
  const questions = JSON.parse(localStorage.getItem("questions"));
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(props.duration * 60);
  const navigate = useNavigate();
  const submitAnswerHandler = () => {
    let updatedQuestions = [...questions];
    updatedQuestions[quePointer].selectedoption = selectedOption;
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setQuePointer((prev) => prev + 1);
    setSelectedOption(null);
  };

  const submitQuizHandler = () => {
    clearInterval(timer);
    const check1 = () => {
      console.log("Hello 1");
      localStorage.setItem("Hello", "Not Done");
      const event = new StorageEvent("storage", {
        key: "test1",
      });
      window.dispatchEvent(event);
    };
    check1();
    navigate("/dashboard/exam/completed");
    // alert("Quiz Completed");
  };

  useEffect(() => {
    const updateTimer = () => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        submitQuizHandler();
      }
    };
    const timerInterval = setInterval(updateTimer, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  return (
    <section className="flex justify-between items-start w-full">
      <div className="w-[70%] mb-10 mt-6 mx-auto">
        <p className="font-semibold text-sm tracking-wide bg-blue-500 inline-block px-4 py-1 rounded-full text-white">
          Que. {quePointer + 1}
        </p>
        <p className="mt-4 font-medium leading-8 text-lg">
          {questions[quePointer]?.description}
        </p>
        <ul className="mt-4">
          {questions[quePointer]?.options.map((item, index) => {
            return (
              <OptionCard
                onClick={() => setSelectedOption(index)}
                number={String.fromCharCode(index + 65)}
                option_text={item}
                selectedOption={selectedOption}
                index={index}
              />
            );
          })}
        </ul>
        <div className="flex justify-end mt-8">
          {quePointer === questions.length - 1 && (
            <button
              className="bg-blue-500 text-blue-100 hover:text-white hover:bg-blue-600 transition-all duration-150 ease-out focus:outline-none active:border-none font-medium px-6 py-2 rounded-full"
              onClick={submitQuizHandler}
            >
              Submit Quiz
            </button>
          )}
          {selectedOption !== null && quePointer !== questions.length - 1 && (
            <button
              className="bg-blue-500 text-blue-100 hover:text-white hover:bg-blue-600 transition-all duration-150 ease-out focus:outline-none active:border-none font-medium px-6 py-2 rounded-full"
              onClick={submitAnswerHandler}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="w-[18%] flex justify-start items-center sticky top-0 flex-col px-4 bg-slate-100 h-[90vh] shadow border-l">
        <p className="mt-3 text-2xl font-semibold py-3 px-4 rounded-md flex justify-center items-center tracking-wider w-20%]">
          {`${Math.floor(timer / 60)} : ${timer % 60}`}
          <span className="ml-1">
            <Player
              src={require("../animation/timer.json")}
              className="w-12"
              loop
              autoplay
              speed={5}
            />
          </span>
        </p>
        <div className="aspect-square">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" /> 
      <iframe title="mediasoup integration" src="/stream.html" width="640" height="480"></iframe>
        </div>
      </div>
    </section>
  );
};

export default ExamCard;
