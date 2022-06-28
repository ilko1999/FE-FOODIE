import React, { useContext, useEffect, useState } from "react";
import Table from "../components/table/table";
import lunchMenuFlow from "../api/lunchMenuFlow";
import { read_cookie } from "../constData";
import DataContext from "../Context";

function OrdersPage() {
  const [orderedItems, setOrderedItems] = useState([]);
  const [resturantOrFastFood, setResturantOrFastFood] = useState("");
  const { state } = useContext(DataContext);

  async function getOrderedItems(resturant) {
    try {
      const result = await lunchMenuFlow.getOrderedItems(resturant);
      setOrderedItems(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const cookieData = read_cookie("user");
    getOrderedItems(cookieData.username);
    setResturantOrFastFood(cookieData.typeOfResturant);
  }, [state]);

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <div className="w-full py-12 px-4 sm:px-6 lg:py-6 lg:px-8">
        <Table
          resturantOrFastFood={resturantOrFastFood}
          orderedItems={orderedItems}
        />
      </div>
    </div>
  );
}

export default OrdersPage;
