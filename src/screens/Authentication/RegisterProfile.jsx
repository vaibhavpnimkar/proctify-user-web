import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterProfile = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [imageBase64Data, setImageBase64Data] = useState();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImageBase64Data(imageSrc);
  }, [webcamRef]);

  const Recapture = useCallback(() => {
    setImageBase64Data(null);
  }, []);

  const register = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/api/v1/student/faceregister",
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
      // console.log(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <section className="flex justify-center items-center h-[90vh] w-full bg-blue-50">
      <div className="w-[36%] flex justify-center items-center flex-col py-6 px-5 rounded-md">
        <p className="text-2xl font-semibold my-4">Register Profile</p>
        {!imageBase64Data && (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        )}
        {imageBase64Data && <img src={imageBase64Data} alt="profile" />}
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
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterProfile;
