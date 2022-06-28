import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import registerPerson from "../assets/register.svg";
import userFlow from "../api/userFlow";
import Alert from "../components/alert/alert";
import { useNavigate } from "react-router-dom";
import { Formik, useField } from "formik";
import * as yup from "yup";
import { delete_cookie } from "../constData";
import Radio from "@mui/material/Radio";
import { FormControlLabel } from "@mui/material";
import { orange } from "@mui/material/colors";

const validationSchema = yup.object({
  username: yup.string().required("This field is required!").max(20).min(4),
  email: yup
    .string()
    .email("This is not a valid email!")
    .required("This field is required!"),
  password: yup.string().required("Password is required"),
  repeatPassword: yup
    .string()
    .required("This field is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  numOfTables: yup.number().required("This field is required"),
});

function Register() {
  useEffect(() => {
    delete_cookie("user");
  }, []);

  const [registerError, setRegisterError] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setisChecked] = useState(false);

  function handleCheck(e) {
    const { checked } = e.target;
    setisChecked(checked);
  }

  async function register(
    username,
    email,
    password,
    repeatPassword,
    typeOfResturant,
    numOfTables
  ) {
    let numOfTablesModified = Array.from({ length: numOfTables }, (_, i) => ({
      table: i + 1,
    }));
    try {
      let response = await userFlow.register(
        username,
        email,
        password,
        repeatPassword,
        typeOfResturant,
        numOfTablesModified
      );

      setRegisterError(response);
      navigate("/login");
      setIsLoading(false);
    } catch (err) {
      setRegisterError(err.response.data);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[750px] shadow-md shadow-gray-300 rounded-lg sm:max-w[900px]">
        <div className="w-full h-[750px] hidden md:block p-2">
          <img className="w-full h-full" src={registerPerson} alt="/"></img>
        </div>
        <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-2 lg:px-2">
          <div className="max-w-md w-full space-y-6">
            <div>
              <h2 className="mt-4 text-center text-4xl font-bold text-gray-900">
                Create your account securely 🔐
              </h2>
              {Object.keys(registerError).length !== 0 &&
              registerError.status !== 200 ? (
                <span className="flex justify-center">
                  <Alert errorData={registerError} />
                </span>
              ) : (
                ""
              )}
            </div>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                repeatPassword: "",
                typeOfResturant: "resturant",
                numOfTables: "0",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                setIsLoading(true);
                if (data.typeOfResturant === "resturant") {
                  register(
                    data.username,
                    data.email,
                    data.password,
                    data.repeatPassword,
                    data.typeOfResturant,
                    data.numOfTables
                  );
                } else {
                  register(
                    data.username,
                    data.email,
                    data.password,
                    data.repeatPassword,
                    data.typeOfResturant,
                    (data.numOfTables = "0")
                  );
                }

                if (!isLoading) {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                isSubmitting,
                isValid,
                handleChange,
                handleSubmit,
              }) => (
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                  <div className=" -space-y-px">
                    <legend className="contents text-base font-medium text-gray-900">
                      Type of food place your registering
                    </legend>
                    <div className="pt-4 pb-4 flex justify-between">
                      <div className="flex items-center">
                        <MyRadio
                          name="typeOfResturant"
                          type="radio"
                          value="resturant"
                          label="Resturant"
                        />
                        <MyRadio
                          name="typeOfResturant"
                          type="radio"
                          value="fastFood"
                          label="Healthy fast food place"
                        />
                      </div>
                    </div>
                    <span>
                      {values.typeOfResturant === "resturant" ? (
                        <div>
                          <label
                            htmlFor="numOfTables"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Number Of Tables
                          </label>
                          <input
                            onChange={handleChange}
                            type="text"
                            name="numOfTables"
                            value={values.numOfTables}
                            className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300
                            ${
                              errors.numOfTables
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md`}
                          />
                          <p className="text-red-500 text-sm">
                            {errors.numOfTables}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </span>
                    <div className="pt-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="username"
                        value={values.username}
                        className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300
                            ${
                              errors.username
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md`}
                      />
                      <p className="text-red-500 text-sm">{errors.username}</p>
                    </div>

                    <div className="pt-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        value={values.email}
                        className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300
                        ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                      />
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    </div>

                    <span className="grid grid-cols-2 gap-2">
                      <span>
                        <div className="pt-4">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            onChange={handleChange}
                            type={`${isChecked ? "text" : "password"}`}
                            name="password"
                            value={values.password}
                            className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300
                            ${
                              errors.password
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md`}
                          />
                        </div>
                        <p className="text-red-500 text-sm">
                          {errors.password}
                        </p>
                      </span>

                      <span>
                        <div className="pt-4">
                          <label
                            htmlFor="repeatPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Repeat Password
                          </label>
                          <input
                            onChange={handleChange}
                            type={`${isChecked ? "text" : "password"}`}
                            name="repeatPassword"
                            value={values.repeatPassword}
                            className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300
                            ${
                              errors.repeatPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md`}
                          />
                          <p className="text-red-500 text-sm">
                            {errors.repeatPassword}
                          </p>
                        </div>
                      </span>
                    </span>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        onClick={(e) => handleCheck(e)}
                        id="showPass"
                        name="showPass"
                        type="checkbox"
                        defaultChecked={isChecked}
                        className="focus:ring-orange-300 h-4 w-4 text-orange-400 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="showPass"
                        className="font-medium text-gray-700"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={isSubmitting && isValid}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-orange-300 group-hover:text-orange-400"
                          aria-hidden="true"
                        />
                      </span>
                      {isLoading ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel
      {...field}
      control={
        <Radio
          sx={{
            color: orange[800],
            "&.Mui-checked": {
              color: orange[600],
            },
          }}
        />
      }
      label={label}
    />
  );
};
