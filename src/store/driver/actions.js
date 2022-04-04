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

export const fetchDrivers = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_DRIVERS_REQUEST });
    const response = await axios.get(`/drivers?page=${page}&limit=${limit}`);
    dispatch({ type: types.FETCH_DRIVERS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_DRIVERS_FAILURE, payload: e.message });
  }
};

export const fetchSingleDriver = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_DRIVER_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.get(`/drivers/${id}`);
        resolve(response);
      }, 2000)
    );
    dispatch({
      type: types.FETCH_SINGLE_DRIVER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.FETCH_SINGLE_DRIVER_RESET, payload: e.message });
  }
};

export const deleteDriver = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DRIVER_REQUEST });
    const response = await axios.delete(`/drivers/${id}`);
    dispatch({
      type: types.DELETE_DRIVER_UPDATE_LIST,
      payload: id,
    });
    dispatch({
      type: types.DELETE_DRIVER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_DRIVER_FAILURE, payload: e.message });
  }
};

export const editDriver = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_DRIVER_REQUEST });
    await axios.patch(`/drivers/${id}`, data);
    dispatch({ type: types.EDIT_DRIVER_SUCCESS });
  } catch (e) {
    dispatch({ type: types.EDIT_DRIVER_FAILURE, payload: e.message });
  }
};

export const resetCreateDriver = () => {
  return {
    type: types.CREATE_DRIVER_RESET,
  };
};

export const resetFetchDrivers = () => {
  return {
    type: types.FETCH_DRIVERS_RESET,
  };
};

export const resetFetchSingleDriver = () => ({
  type: types.FETCH_SINGLE_DRIVER_RESET,
});

export const resetDeleteDriver = () => ({
  type: types.DELETE_DRIVER_RESET,
});

export const resetEditDriver = () => ({
  type: types.EDIT_DRIVER_RESET,
});
