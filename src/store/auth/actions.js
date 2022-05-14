import { data } from "autoprefixer";
import axios from "../../utils/axios";
import * as types from "./types";
export const signIn = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const response = await axios().post("/auth/login", data);
    localStorage.setItem("data", JSON.stringify(response.data));
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.LOGIN_FAILURE, payload: "invalid credentials" });
  }
};
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: types.LOGIN_RESET,
  });
};

export const resetSignIn = () => ({
  type: types.LOGIN_RESET,
});
