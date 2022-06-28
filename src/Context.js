import { createContext, useEffect, useState } from "react";
import { read_cookie } from "./constData";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [MenuItems, setMenuItems] = useState(null);
  const [chosenMenu, setChosenMenu] = useState("dashboard");
  const [state, updateState] = useState("");
  const [resturantName, setresturantName] = useState("");

  const initialArray = [];
  const [cartItems, setCartItems] = useState(initialArray);
  const [itemsForBill, setItemsForBill] = useState([]);

  useEffect(() => {
    const cookieData = read_cookie("user");
    if (cookieData) {
      setSelected(cookieData.numberOfTables[0]);
      setresturantName(cookieData.username);
    }
  }, [resturantName]);

  const [selected, setSelected] = useState("");

  return (
    <DataContext.Provider
      value={{
        item: 1,
        chosenMenu,
        setChosenMenu,
        MenuItems,
        setMenuItems,
        cartItems,
        setCartItems,
        itemsForBill,
        setItemsForBill,
        selected,
        setSelected,
        state,
        updateState,
        resturantName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
