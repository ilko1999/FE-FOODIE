import React from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";

function quantitybtns() {
  return (
    <div>
      <span className="flex">
        <span className="cursor-pointer">
          <BsPlus size={28} />
        </span>
        <span className="cursor-pointer">
          <BiMinus size={28} />
        </span>
      </span>
    </div>
  );
}

export default quantitybtns;
