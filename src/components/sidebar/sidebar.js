import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";

import { BsTable } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import Tooltip from "../tooltip/tooltip";
import DataContext from "../../Context";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { chosenMenu, setChosenMenu } = useContext(DataContext);
  const navigate = useNavigate();
  function handleClick(event) {
    const value = event.currentTarget.getAttribute("path");
    setChosenMenu(value);
  }

  function handleLogout() {
    navigate("/");
  }
  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col border-gray-100 text-white shadow-lg z-10">
      <span onClick={handleLogout}>
        <SideBarIcon
          onMe={chosenMenu === "logout" ? true : false}
          icon={<FiLogOut size="26" />}
          text={"Logout 👋"}
        />
      </span>
      <Divider />
      <span onClick={handleClick} path={"dashboard"}>
        <SideBarIcon
          onMe={chosenMenu === "dashboard" ? true : false}
          icon={<MdDashboard size="26" />}
          text={"Dashboard 🏢"}
        />
      </span>
      <span onClick={handleClick} path={"orders"}>
        <SideBarIcon
          onMe={chosenMenu === "orders" ? true : false}
          icon={<BsTable size="26" />}
          text={"Lunch Orders 🍴"}
        />
      </span>
    </div>
  );
}

const SideBarIcon = ({ onMe, icon, text }) => (
  <>
    <div
      className={`sidebar-icon group ${onMe ? "rounded-xl bg-orange-400" : ""}`}
    >
      {icon}

      <span className="group-hover">
        <Tooltip text={text} typeTooltip={"side"} />
      </span>
    </div>
  </>
);

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
