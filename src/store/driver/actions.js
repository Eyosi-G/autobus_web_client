import * as types from "./types";
import axios from "../../utils/axios";

export const createDriver = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DRIVER_REQUEST });
    const driver = await axios.post("/drivers", data);
    dispatch({ type: types.CREATE_DRIVER_SUCCESS, payload: driver });
  } catch (e) {
    dispatch({ type: types.CREATE_DRIVER_FAILURE, payload: e.message });
  }
};

export const resetDriver = () => {
  return {
    type: types.RESET_DRIVER,
  };
};
