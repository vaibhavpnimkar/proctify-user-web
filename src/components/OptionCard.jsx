import React from "react";

const OptionCard = (props) => {
  return (
    <li
      className={`py-2 ${
        props.selectedOption === props.index
          ? "bg-blue-600 text-white"
          : "border-black/60 text-black/80"
      }  text-[15px] border-[1.6px] mb-4 rounded-lg px-4 cursor-pointer`}
      onClick={props.onClick}
    >
      <span className="font-semibold">{props.number}.</span> {props.option_text}
    </li>
  );
};

export default OptionCard;
