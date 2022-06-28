import React, { useState, useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import loginPerson from "../assets/login.svg";
import userFlow from "../api/userFlow";
import Alert from "../components/alert/alert";
import { useNavigate } from "react-router-dom";
import { bake_cookie, delete_cookie } from "../constData";

function Login() {
  useEffect(() => {
    delete_cookie("user");
  }, []);

  const navigate = useNavigate();
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [loginError, setLoginError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isChecked, setisChecked] = useState(false);

  function handleCheck(e) {
    const { checked } = e.target;
    setisChecked(checked);
  }

  const updateValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function login() {
    try {
      let response = await userFlow.login(
        formValues.username,
        formValues.password
      );

      setLoginError(response);
      setIsLoading(false);
      bake_cookie("user", response.data);
      navigate("/main-menu");
    } catch (err) {
      setLoginError(err.response.data);
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors(validate(formValues));
    setisSubmit(true);
    login();
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  return (
    <div className="w-full h-screen flex px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-md shadow-gray-300 rounded-lg sm:max-w[900px]">
        <div className="w-full h-[550px] hidden md:block">
          <img className="w-full h-full" src={loginPerson} alt="/"></img>
        </div>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-10">
            <div>
              <h2 className="mt-6 text-center text-4xl font-bold text-gray-900">
                Log in to your account 🔐
              </h2>
              {Object.keys(loginError).length !== 0 &&
              loginError.status !== 200 ? (
                <span className="flex justify-center">
                  <Alert errorData={loginError} />
                </span>
              ) : (
                ""
              )}
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className=" -space-y-px">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium
                      text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formValues.username}
                    onChange={updateValues}
                    className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300 ${
                      formErrors.username ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  <p className="text-red-500 text-sm">{formErrors.username}</p>
                </div>
                <div className="pt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    type={`${isChecked ? "text" : "password"}`}
                    name="password"
                    id="password"
                    value={formValues.password}
                    onChange={updateValues}
                    className={`mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-300 focus:border-orange-300 ${
                      formErrors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                  <p className="text-red-500 text-sm">{formErrors.password}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  {isChecked}
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
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
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
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
