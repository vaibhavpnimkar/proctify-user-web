import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLocation, useNavigate } from "react-router-dom";

const PermissionCheck = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [permissionCheck, setPermissionCheck] = useState({
    video: null,
    audio: null,
    screen: null,
    operatingSystem: null,
  });

  useEffect(() => {
    if (location.state) {
      navigator.permissions
        .query({ name: "camera" })
        .then((cameraPermission) => {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            video: cameraPermission.state === "granted",
          }));
        });
      navigator.permissions
        .query({ name: "microphone" })
        .then((audioPermission) => {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            audio: audioPermission.state === "granted",
          }));
        });

      const userAgent = navigator.userAgent;
      if (userAgent.includes("Windows")) {
        setPermissionCheck((prevPermissions) => ({
          ...prevPermissions,
          operatingSystem: true,
        }));
      } else {
        setPermissionCheck((prevPermissions) => ({
          ...prevPermissions,
          operatingSystem: false,
        }));
      }
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        setPermissionCheck((prevPermissions) => ({
          ...prevPermissions,
          screen: true,
        }));
      } else {
        setPermissionCheck((prevPermissions) => ({
          ...prevPermissions,
          screen: false,
        }));
      }
    } else {
      navigate("/dashboard");
    }
  }, []);

  const givePermissionHandler = () => {
    if (!permissionCheck.audio) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            audio: true,
          }));
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(function (error) {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            audio: false,
          }));
        });
    }
    if (!permissionCheck.video) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            video: true,
          }));
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(function (error) {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            video: false,
          }));
        });
    }
    if (!permissionCheck.screen) {
      navigator.mediaDevices
        .getDisplayMedia({ video: true })
        .then(function (stream) {
          const track = stream.getVideoTracks()[0];
          console.log(track.label);
          if (track.label === "screen") {
            setPermissionCheck((prevPermissions) => ({
              ...prevPermissions,
              screen: true,
            }));
          } else {
            setPermissionCheck((prevPermissions) => ({
              ...prevPermissions,
              screen: false,
            }));
          }
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(function (error) {
          setPermissionCheck((prevPermissions) => ({
            ...prevPermissions,
            screen: false,
          }));
        });
    }
  };

  return (
    <main className="flex items-start select-none">
      <section className="w-full min-h-[100vh] mx-auto flex flex-col">
        <p className="text-center my-8 font-semibold text-3xl">
          Checking Permissions
        </p>
        <ul className="w-[40%] mx-auto">
          <li className="my-6 flex justify-between items-center bg-blue-50 shadow px-4 py-5 rounded relative">
            Video Permission
            <span>
              {permissionCheck.video === true && (
                <Player
                  src={require("../../../animation/tick.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-16 absolute -right-[5px] top-0"
                />
              )}
              {permissionCheck.video === false && (
                <Player
                  src={require("../../../animation/wrong.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-6"
                />
              )}
              {permissionCheck.video === null && (
                <Oval
                  height={20}
                  width={20}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              )}
            </span>
          </li>
          <li className="my-6 flex justify-between items-center bg-blue-50 shadow px-4 py-5 rounded relative">
            Audio Permission
            <span>
              {permissionCheck.audio === true && (
                <Player
                  src={require("../../../animation/tick.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-16 absolute -right-[5px] top-0"
                />
              )}
              {permissionCheck.audio === false && (
                <Player
                  src={require("../../../animation/wrong.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-6"
                />
              )}
              {permissionCheck.audio === null && (
                <Oval
                  height={20}
                  width={20}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              )}
            </span>
          </li>
          <li className="my-6 flex justify-between items-center bg-blue-50 shadow px-4 py-5 rounded relative">
            Screen Recording Permission
            <span>
              {permissionCheck.screen === true && (
                <Player
                  src={require("../../../animation/tick.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-16 absolute -right-[5px] top-0"
                />
              )}
              {permissionCheck.screen === false && (
                <Player
                  src={require("../../../animation/wrong.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-6"
                />
              )}
              {permissionCheck.screen === null && (
                <Oval
                  height={20}
                  width={20}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              )}
            </span>
          </li>
          <li className="my-6 flex justify-between items-center bg-blue-50 shadow px-4 py-5 rounded relative">
            Operating System
            <span>
              {permissionCheck.operatingSystem === true && (
                <Player
                  src={require("../../../animation/tick.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-16 absolute -right-[5px] top-0"
                />
              )}
              {permissionCheck.operatingSystem === false && (
                <Player
                  src={require("../../../animation/wrong.json")}
                  autoplay
                  speed={2}
                  keepLastFrame
                  className="w-6"
                />
              )}
              {permissionCheck.operatingSystem === null && (
                <Oval
                  height={20}
                  width={20}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              )}
            </span>
          </li>
        </ul>
        {(!permissionCheck.audio ||
          !permissionCheck.operatingSystem ||
          !permissionCheck.screen ||
          !permissionCheck.video) && (
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[18%] mx-auto mt-4"
            onClick={givePermissionHandler}
          >
            Give Permission
          </button>
        )}
        {(permissionCheck.audio ||
          permissionCheck.operatingSystem ||
          permissionCheck.screen ||
          permissionCheck.video) && (
          <button
            className="bg-blue-600 text-white px-6 py-4 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[18%] mx-auto mt-4 text-xl"
            onClick={() =>
              navigate("/dashboard/verify", { state: location?.state })
            }
          >
            Start Test
          </button>
        )}
      </section>
    </main>
  );
};

export default PermissionCheck;
