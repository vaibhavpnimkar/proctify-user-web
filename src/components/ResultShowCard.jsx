import React from "react";

const ResultShowCard = (props) => {
  return (
    <div
      className="w-[85%] bg-white shadow-md border rounded-md py-4 pl-4 flex justify-between items-start cursor-pointer relative"
      onClick={props?.onClick}
    >
      <div>
        <p className="font-semibold mb-1 text-lg">
          {props.data.code} - {props.data.name}
        </p>
        <p className="text-sm mr-2 mb-1">
          Published On: {props.data.date} {props.data.time}
        </p>
      </div>
      <button
        className={`text-white text-sm font-medium px-4 py-1 transition_fade bg-gradient-to-tr ${
          props.data.published
            ? "from-green-600 to-green-700 shadow-md shadow-green-500/40"
            : "from-red-600 to-red-700 shadow-md shadow-red-500/40"
        } absolute right-0 top-0 rounded-r-md h-full w-[14%]`}
      >
        {props.data.published ? "Result Published" : "Not Published"}
      </button>
    </div>
  );
};

export default ResultShowCard;
