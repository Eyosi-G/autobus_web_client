import * as types from "./types";
import * as authTypes from "../auth/types";
import axios from "../../utils/axios";
export const changeEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: types.CHANGE_EMAIL_REQUEST });
    const response = await axios.patch("/settings/change-email", { email });
    dispatch({ type: types.CHANGE_EMAIL_SUCCESS, payload: response.data });
    let data =
      localStorage.getItem("data") && JSON.parse(localStorage.getItem("data"));
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...data,
        user: { ...data.user, email },
      })
    );
    dispatch({ type: authTypes.CHANGE_EMAIL, payload: email });
  } catch (e) {
    dispatch({ type: types.CHANGE_EMAIL_FAILURE, payload: e.message });
  }
};

export const changePassword =
  (oldpassword, newpassword) => async (dispatch) => {
    try {
      dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
      const response = await axios.patch("/settings/change-password", {
        oldpassword,
        newpassword,
      });
      dispatch({ type: types.CHANGE_PASSWORD_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({ type: types.CHANGE_PASSWORD_FAILURE, payload: e.message });
    }
  };

export const changePhonenumber = (phone_number) => async (dispatch) => {
  try {
    dispatch({ type: types.CHANGE_PHONE_NUMBER_REQUEST });
    const response = await axios.patch("/settings/change-phone-number", {
      phone_number,
    });
    dispatch({
      type: types.CHANGE_PHONE_NUMBER_SUCCESS,
      payload: response.data,
    });
    let data =
      localStorage.getItem("data") && JSON.parse(localStorage.getItem("data"));
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...data,
        user: { ...data.user, phone_number },
      })
    );
    dispatch({ type: authTypes.CHANGE_PHONE_NUMBER, payload: phone_number });
  } catch (e) {
    dispatch({ type: types.CHANGE_PHONE_NUMBER_FAILURE, payload: e.message });
  }
};

export const resetChangeEmail = () => ({ type: types.CHANGE_EMAIL_RESET });
export const resetChangePhonenumber = () => ({
  type: types.CHANGE_PHONE_NUMBER_RESET,
});
export const resetChangePassword = () => ({
  type: types.CHANGE_PASSWORD_RESET,
});
