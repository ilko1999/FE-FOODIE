import React, { useState, useEffect, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { parse } from "papaparse";
import QrCode from "qrcode";
import lunchMenuFlow from "../api/lunchMenuFlow";
import DataContext from "../Context";
import {
  bake_cookie,
  delete_cookie,
  download,
  read_cookie,
} from "../constData";

function DashboardPage() {
  const { MenuItems, setMenuItems } = useContext(DataContext);
  const [qrCode, setqrCode] = useState("");
  const [currResturantName, setCurrResturantName] = useState("");
  const [isDisabled, setisDisabled] = useState(false);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
  } = useDropzone({
    accept: {
      "text/*": [".csv"],
    },
    disabled: isDisabled,
  });

  useEffect(() => {
    acceptedFiles.map((file) =>
      parse(file, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: async function (results) {
          try {
            results.data = results.data.map((obj, i) => {
              return { id: i + 1, ...obj };
            });
            let response = await lunchMenuFlow.createNewMenu(results.data);
            setMenuItems(response.data);
          } catch (err) {
            console.log(err);
          }
        },
      })
    );
  }, [acceptedFiles]);

  async function getAttachedMenu(user) {
    try {
      let response = await lunchMenuFlow.getMenu(user.menuAttached);
      setMenuItems(response.data.menu);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const result = read_cookie("user");
    setCurrResturantName(result.username);
    if (result.menuAttached !== "") {
      getAttachedMenu(result);
    }
  }, []);

  useEffect(() => {
    if (MenuItems !== null) {
      let hostname = window.location.hostname;
      QrCode.toDataURL(`http://${hostname}/menu/${MenuItems._id}`).then(
        setqrCode
      );
      setisDisabled(true);
      (async () => {
        try {
          const user = read_cookie("user");

          let otherResponse = await lunchMenuFlow.updateMenu(
            user.username,
            MenuItems._id
          );

          delete_cookie("user");
          bake_cookie("user", otherResponse.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [MenuItems]);

  async function handleDelete() {
    setMenuItems(null);
    setisDisabled(false);

    const result = read_cookie("user");
    try {
      const response = await lunchMenuFlow.updateMenu(result.username, "");
      delete_cookie("user");
      bake_cookie("user", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-full flex-col justify-center items-center">
      <div className="text-3xl font-bold my-3">
        {" "}
        Resturant - {currResturantName}
      </div>
      <div className="w-full py-12 px-4 sm:px-6 lg:py-6 lg:px-8">
        <div
          {...getRootProps()}
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
            isDragActive
              ? "border-orange-500 bg-orange-100 animate-pulse"
              : isFocused
              ? "border-orange-500"
              : isDisabled
              ? "text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-1 text-center">
            <div className="flex text-gray-600">
              <label
                className={`relative ${
                  isDragActive ? "bg-orange-100" : "bg-white"
                } rounded-md font-medium text-2xl pb-4`}
              >
                {isDragActive ? (
                  <span>
                    <p>Drop it like its hot!! 🔥</p>
                  </span>
                ) : (
                  <p className={`${isDisabled ? "cursor-not-allowed" : ""}`}>
                    Drag and drop files here, or just click the container and
                    select your menu.
                  </p>
                )}
              </label>
            </div>
            <p className="text-gray-500 text-lg">
              Only CSV files are accepted. 🤓
            </p>
          </div>
        </div>
      </div>
      {MenuItems !== null ? (
        <span
          className="text-2xl font-bold w-full px-8 hover:cursor-pointer hover:text-gray-600 text-gray-900"
          onClick={handleDelete}
        >
          Delete your menu! 😭
        </span>
      ) : (
        ""
      )}
      {MenuItems !== null ? (
        <span className="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 ">
          <span className="flex justify-between items-center">
            <span className="font-medium text-3xl flex">
              Your selected Menu! 📃
            </span>

            <span className="flex items-center" onClick={(e) => download(e)}>
              <img src={qrCode} />
            </span>
          </span>
          {MenuItems !== null ? (
            <span>
              <span>
                <span className="font-medium text-2xl">Main Course</span>
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
                  {MenuItems.menu
                    .filter((item) => item.type === "main")
                    .map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl">
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
                    ))}
                </dl>
              </span>

              <span>
                <span className="font-medium text-2xl">Salads</span>
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
                  {MenuItems.menu
                    .filter((item) => item.type === "salad")
                    .map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl">
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
                    ))}
                </dl>
              </span>

              <span>
                <span className="font-medium text-2xl">Desserts</span>
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
                  {MenuItems.menu
                    .filter((item) => item.type === "dessert")
                    .map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl">
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
                    ))}
                </dl>
              </span>

              <span>
                <span className="font-medium text-2xl">Drinks</span>
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 pt-4 pb-4">
                  {MenuItems.menu
                    .filter((item) => item.type === "drinks")
                    .map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white border-gray-200 border-4 text-2xl">
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
                    ))}
                </dl>
              </span>
            </span>
          ) : (
            ""
          )}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardPage;
