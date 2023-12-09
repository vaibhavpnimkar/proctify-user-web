import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Instructions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  useEffect(() => {
    if (location.state) {
      setData(location?.state);
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <main className="flex items-start select-none">
      <section className="w-full min-h-[100vh] mx-auto flex flex-col">
        <p className="text-center my-8 font-semibold text-3xl">Instructions</p>
        <ul className="w-[60%] mx-auto">
          <li className="my-3">
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ullam
            odit modi placeat possimus quisquam magnam perferendis provident
            ipsum!
          </li>
          <li className="my-3">
            2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur facilis iusto omnis nesciunt delectus maxime eveniet
            eaque fuga explicabo at!
          </li>
          <li className="my-3">
            3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur commodi fugiat iste magni, vero aspernatur at enim
            eligendi?
          </li>
          <li className="my-3">
            4. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure,
            odio?
          </li>
          <li className="my-3">
            5. Total Duration of this examination is {data.duration} minuites.
          </li>
          <li className="my-3">
            6. Question weightage for each question is {data.question_weightage}{" "}
            and negative marks are {data.negative_marks}.
          </li>
        </ul>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[12%] mx-auto mt-4"
          onClick={() =>
            navigate("/dashboard/checking", { state: location?.state })
          }
        >
          Next Page
        </button>
      </section>
    </main>
  );
};

export default Instructions;
