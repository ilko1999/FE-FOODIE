import React from "react";

function Tooltip({ text, typeTooltip }) {
  return (
    <span
      className={`${
        typeTooltip === "side" ? "sidebar-tooltip" : "tooltip"
      } group-hover:scale-100`}
    >
      {text}
    </span>
  );
}

export default Tooltip;
