import React from "react";

function MyChip({ label }) {
  return (
    <div
      className={`px-4 py-2 rounded-full ${
        label === "Initial"
          ? "bg-gray-400"
          : label === "In-process"
          ? "bg-orange-400"
          : "bg-green-500"
      } text-white inline-block font-bold`}
    >
      {label}
    </div>
  );
}

export default MyChip;
