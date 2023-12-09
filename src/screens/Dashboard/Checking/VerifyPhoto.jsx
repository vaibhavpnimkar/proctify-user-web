import axios from "axios";
import React, { useRef, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import toast from "react-hot-toast";

const VerifyPhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const webcamRef = useRef(null);
  const [imageBase64Data, setImageBase64Data] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImageBase64Data(imageSrc);
  }, [webcamRef]);

  const Recapture = useCallback(() => {
    setImageBase64Data(null);
  }, []);

  const verifyProfile = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/api/v1/student/facelogin",
        {
          // userId: "hetpatel",
          imageBase64Data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      storeExamDataInLocal();
      const check = () => {
        console.log("Hello");
        localStorage.setItem("Hello", "Done");
        const event = new StorageEvent("storage", {
          key: "test",
        });
        window.dispatchEvent(event);
      };
      check();
    } catch (error) {
      navigate("/dashboard");
      console.log("Registration error:", error.response.data.msg);
      toast.error(error.response.data.msg.message);
    }
  };

  const storeExamDataInLocal = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    try {
      const response = await axios.get(
        `http://127.0.0.1:3002/api/v1/student/getquestions/${location.state.code}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("questions", JSON.stringify(response.data.data));
      navigate(`/dashboard/exam/${location.state.code}`, {
        state: location?.state,
      });
      // document.documentElement.requestFullscreen().then(() => {

      // });
    } catch (error) {
      console.error("Exam Data Fetching error:", error.response.data.msg);
      // toast.error(error.response.data.msg);
    }
  };
  return (
    <section className="flex justify-center items-center h-[90vh] w-full bg-blue-50">
      <div className="w-[36%] flex justify-center items-center flex-col py-6 px-5 rounded-md">
        <p className="text-2xl font-semibold my-4">Verify Profile</p>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <div className="flex justify-center items-center w-full ">
          {!imageBase64Data && (
            <button
              className="bg-blue-600 w-full mt-5 text-white px-6 py-2 rounded-md transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 mr-4"
              onClick={capture}
            >
              Capture
            </button>
          )}
          {imageBase64Data && (
            <button
              className="bg-blue-600 w-full mt-5 text-white px-6 py-2 rounded-md transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 mr-4"
              onClick={Recapture}
            >
              Recapture
            </button>
          )}
          <button
            className="bg-blue-600 w-full mt-5 text-white px-6 py-2 rounded-md transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 "
            onClick={verifyProfile}
          >
            Verify
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyPhoto;
