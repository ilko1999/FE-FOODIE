import React from "react";

function tooltipCart({ children }) {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-10 right-5 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-40 p-4 m-2 leading-none text-white bg-orange-400 shadow-lg overflow-x-hidden rounded-md overflow-scroll h-52 w-52"></span>
      </div>
    </div>
  );
}

export default tooltipCart;
