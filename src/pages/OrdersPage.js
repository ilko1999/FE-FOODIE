import React, { useCallback, useContext, useEffect, useState } from "react";
import Table from "../components/table/table";
import lunchMenuFlow from "../api/lunchMenuFlow";
import { read_cookie } from "../constData";
import DataContext from "../Context";

function OrdersPage() {
  const [orderedItems, setOrderedItems] = useState([]);
  const [resturantOrFastFood, setResturantOrFastFood] = useState("");
  const { state } = useContext(DataContext);

  const getItems = useCallback(async (resturant) => {
    try {
      const result = await lunchMenuFlow.getOrderedItems(resturant);
      setOrderedItems(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const cookieData = read_cookie("user");
    getItems(cookieData.username);
    setResturantOrFastFood(cookieData.typeOfResturant);
  }, [getItems, setOrderedItems, state]);

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
