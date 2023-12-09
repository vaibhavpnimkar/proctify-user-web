import React from "react";
import { useLocation } from "react-router-dom";
import ExamCard from "../../components/ExamCard";

const GiveExam = () => {
  const location = useLocation();

  // useEffect(() => {
  //   const blockShortcuts = (event) => {
  //     if (
  //       (event.ctrlKey || event.metaKey) &&
  //       (event.key === "c" ||
  //         event.key === "v" ||
  //         event.key === "t" ||
  //         event.key === "r")
  //     ) {
  //       event.preventDefault();
  //     }
  //   };
  //   window.addEventListener("keydown", blockShortcuts);
  //   return () => {
  //     window.removeEventListener("keydown", blockShortcuts);
  //   };
  // }, []);

  return (
    <main className="flex items-start select-none">
      <section className="w-full min-h-[100vh] mx-auto flex flex-col">
        <section className="flex justify-between items-center w-full mx-auto py-4 px-10 bg-white shadow border-b">
          <p className="font-semibold">
            Exam: <span className="font-normal">{location?.state?.name}</span>
          </p>
          <p className="font-semibold">
            Exam Code:{" "}
            <span className="font-normal">{location?.state?.code}</span>
          </p>
        </section>
        <section className="flex justify-between items-start">
          <ExamCard duration={location.state.duration} />
        </section>
      </section>
    </main>
  );
};

export default GiveExam;
