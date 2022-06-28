import http from "./http";
import apiResultWrapper from "./apiResultWrapper";

const createNewMenu = async (myMenu) =>
  apiResultWrapper.apiResult(
    await http.post(`/lunchMenus/lunchMenu`, {
      menu: myMenu,
    })
  );

const getMenu = async (myMenuId) =>
  apiResultWrapper.apiResult(
    await http.get(`/lunchMenus/get-lunchMenu/${myMenuId}`)
  );

const updateMenu = async (yourUsername, yourMyMenuId) =>
  apiResultWrapper.apiResult(
    await http.patch(`/auth/menu-update`, {
      username: yourUsername,
      menuToBeAttached: yourMyMenuId,
    })
  );

const createOrder = async (data) =>
  apiResultWrapper.apiResult(
    await http.post("/lunchMenuItems/lunchMenuItems", data)
  );

const getOrderedItems = async (returantName) =>
  apiResultWrapper.apiResult(
    await http.get(`/lunchMenuItems/get-items/${returantName}`)
  );

const updateStatusofOrder = async (idOfOrder) =>
  apiResultWrapper.apiResult(
    await http.patch("/lunchMenuItems/update-order", {
      id: idOfOrder,
    })
  );

export default {
  createNewMenu,
  getMenu,
  updateMenu,
  createOrder,
  getOrderedItems,
  updateStatusofOrder,
};
