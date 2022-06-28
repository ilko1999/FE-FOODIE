import http from "./http";
import apiResultWrapper from "./apiResultWrapper";

const login = async (yourUsername, yourPassword) =>
  apiResultWrapper.apiResult(
    await http.post(`/auth/login`, {
      username: yourUsername,
      password: yourPassword,
    })
  );

const register = async (
  yourUsername,
  yourEmail,
  yourPassword,
  yourRepeatPassword,
  yourChosenResturant,
  yourChosenNum
) =>
  apiResultWrapper.apiResult(
    await http.post(`/auth/register`, {
      username: yourUsername,
      email: yourEmail,
      password: yourPassword,
      repeatPassword: yourRepeatPassword,
      menuAttached: "",
      typeOfResturant: yourChosenResturant,
      numberOfTables: yourChosenNum,
    })
  );

export default {
  login,
  register,
};
