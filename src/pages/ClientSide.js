import React, { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import lunchMenuFlow from "../api/lunchMenuFlow";
import { BsBasket, BsPlus } from "react-icons/bs";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { BiMinus } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useCart } from "react-use-cart";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import DataContext from "../Context";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function ClientSide() {
  const [MenuItems, setMenuItems] = useState([]);
  const [currentResturant, setcurrentResturant] = useState({});
  const { selected } = useContext(DataContext);
  const [foodPlaceType, setFoodPlaceType] = useState("");
  const [personName, setPersonName] = useState("");
  const [tableNumbers, setTableNumbers] = useState([]);

  const { emptyCart } = useCart();

  const { enqueueSnackbar } = useSnackbar();

  const { items, cartTotal } = useCart();

  const { addItem } = useCart();

  function addItemToBasket(itemForBasket) {
    addItem(itemForBasket);
    enqueueSnackbar(itemForBasket.name);
  }

  const navigate = useNavigate();

  async function createNewOrder() {
    let data;
    if (foodPlaceType === "resturant") {
      data = {
        resturantName: currentResturant.username,
        tableNumber: selected.table,
        selectedItems: items,
        totalAmount: cartTotal,
      };
    } else {
      data = {
        resturantName: currentResturant.username,
        personName: personName,
        selectedItems: items,
        totalAmount: cartTotal,
      };
    }
    try {
      let response = await lunchMenuFlow.createOrder(data);
      if (response.status === 200) {
        emptyCart();
        navigate("/order-coming");
      }
    } catch (err) {
      console.log(err);
    }
    setIsOpen(false);
  }

  let [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let response = await lunchMenuFlow.getMenu(id);
        setcurrentResturant(response.data.resturant[0]);
        setMenuItems(response.data.menu.menu);
        setFoodPlaceType(response.data.resturant[0].typeOfResturant);
        setTableNumbers(response.data.resturant[0].numberOfTables);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <div className="w-full py-12 px-4 sm:px-6 lg:py-6 lg:px-8">
        <div className={`mt-1 px-6 pt-5 pb-6 rounded-md `}>
          <div className="space-y-1 text-center ">
            <div className="text-gray-900 sm:text-4xl text-3xl font-bold pb-2">
              The Menu of {currentResturant.username} 📃
            </div>
            <span className="fixed bottom-16 right-10 z-10">
              <span
                className=" flex items-center justify-center 
                h-12 w-12 mt-2 mb-2 shadow-lg
                bg-orange-500 text-white
                hover:bg-orange-400
                rounded-2xl hover:rounded-xl
                transition-all duration-100 ease-linear
                cursor-pointer"
              >
                <BsBasket size="32" onClick={() => setIsOpen(true)} />
              </span>
            </span>
          </div>
        </div>
        {foodPlaceType === "resturant" ? (
          <span>
            <span className="text-gray-900 text-lg font-semibold">
              Choose the table you are sitting at 🪑
            </span>
            <DropdownList tables={tableNumbers} />
          </span>
        ) : (
          <span className="grid sm:grid-cols-5 md:grid-cols-3">
            <span>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your name
              </label>
              <input
                type="text"
                name="username"
                onChange={(e) => setPersonName(e.target.value)}
                className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300
        rounded-md`}
              />
            </span>
          </span>
        )}
        <span>
          <span>
            <span className="font-medium text-2xl">Main Course</span>
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
              {MenuItems.filter((item) => item.type === "main").map(
                (feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div
                        onClick={() => addItemToBasket(feature)}
                        className="cursor-pointer absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl"
                      >
                        🍝
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Price - {feature.price}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </span>

          <span>
            <span className="font-medium text-2xl">Salads</span>
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
              {MenuItems.filter((item) => item.type === "salad").map(
                (feature) => (
                  <div key={feature.id} className="relative">
                    <dt>
                      <div
                        onClick={() => addItemToBasket(feature)}
                        className="cursor-pointer absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl"
                      >
                        🥗
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Price - {feature.price}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </span>

          <span>
            <span className="font-medium text-2xl">Desserts</span>
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
              {MenuItems.filter((item) => item.type === "dessert").map(
                (feature) => (
                  <div key={feature.id} className="relative">
                    <dt>
                      <div
                        onClick={() => addItemToBasket(feature)}
                        className="cursor-pointer absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl"
                      >
                        🍨
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Price - {feature.price}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </span>

          <span>
            <span className="font-medium text-2xl">Drinks</span>
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
              {MenuItems.filter((item) => item.type === "drinks").map(
                (feature) => (
                  <div key={feature.id} className="relative">
                    <dt>
                      <div
                        onClick={() => addItemToBasket(feature)}
                        className="cursor-pointer absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl"
                      >
                        🥂
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        {feature.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Price - {feature.price}
                    </dd>
                  </div>
                )
              )}
            </dl>
          </span>
        </span>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Your Chosen Items!
                  </Dialog.Title>
                  <div className="mt-2 pb-4">
                    <Cart />
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 font-medium bg-orange-500 text-white
                      hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-lg text-xs"
                      onClick={() => setIsOpen(false)}
                    >
                      Close the receipt 🧾
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 font-medium bg-orange-500 text-white
                      hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-lg text-xs"
                      onClick={createNewOrder}
                    >
                      Order the food 🍽
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function Cart() {
  const {
    isEmpty,
    cartTotal,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (isEmpty)
    return (
      <p className="text-gray-900 font-bold text-lg">Your cart is empty 🤷‍♂️</p>
    );

  return (
    <>
      <span className="text-gray-900 font-bold text-lg">
        Cart - {Math.round(cartTotal * 100) / 100} 🛒
      </span>

      {!isEmpty && (
        <button
          className="text-gray-900 font-bold border-2 border-gray-300 rounded-lg hover:bg-gray-100 p-2 m-2"
          onClick={emptyCart}
        >
          Empty cart 🧹
        </button>
      )}

      <ul>
        {items.map((item) => (
          <li key={item.id} className="font-bold text-gray-900 flex">
            {item.type === "main"
              ? "🍝"
              : item.type === "salad"
              ? "🥗"
              : item.type === "drinks"
              ? "🥂"
              : "🍨"}
            {item.quantity} x {item.name}
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              className="hover:text-gray-400 ml-1"
            >
              <BiMinus size={28} />
            </button>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              className="hover:text-gray-400 ml-1"
            >
              <BsPlus size={28} />
            </button>
            <button
              className="hover:text-gray-400 ml-1"
              onClick={() => removeItem(item.id)}
            >
              <AiOutlineDelete size={28} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function DropdownList({ tables }) {
  const { selected, setSelected } = useContext(DataContext);

  return (
    <div className="w-28 z-10 pb-6 pt-2">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z-10">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.table}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {tables.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.table}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default ClientSide;
