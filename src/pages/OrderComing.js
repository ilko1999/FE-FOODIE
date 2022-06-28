import React from "react";
import waiter from "../assets/waiter.gif";

function OrderComing() {
  return (
    <div className="content-container">
      <div className="flex h-full flex-col justify-center items-center m-6">
        <img
          className="w-[550px] sm:max-w[550px] pb-6"
          src={waiter}
          alt="loading..."
        />
        <span className="text-2xl text-gray-900 font-semibold">
          Your order is coming! 😊
        </span>
      </div>
    </div>
  );
}

export default OrderComing;
