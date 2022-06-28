import React, { useContext } from "react";
import Sidebar from "../components/sidebar/sidebar";
import DataContext from "../Context";
import QrCodePage from "./QrCodePage";
import OrdersPage from "./OrdersPage";
import DashboardPage from "./DashboardPage";

function ResturantDashboard() {
  const { chosenMenu } = useContext(DataContext);
  return (
    <div className="grid grid-cols-12">
      <span className="col-span-2 sm:col-span-1">
        <Sidebar />
      </span>
      <span className="col-span-10 sm:col-span-11">
        {chosenMenu === "qr-code" ? (
          <QrCodePage />
        ) : chosenMenu === "orders" ? (
          <OrdersPage />
        ) : (
          <DashboardPage />
        )}
      </span>
    </div>
  );
}

export default ResturantDashboard;
