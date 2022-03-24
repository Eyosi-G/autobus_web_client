import * as types from "./types";
import axios from "../../utils/axios";

export const createBus = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BUS_REQUEST });
    await new Promise(async (resolve, reject) => {
      setTimeout(async () => {
        await axios.post("/buses", data);
        resolve("");
      }, 1000);
    });
    dispatch({ type: types.CREATE_BUS_SUCCESS });
  } catch (e) {
    dispatch({ type: types.CREATE_BUS_FAILURE, payload: e.message });
  }
};

export const fetchBuses = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_BUSES_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.get(`/buses?page=${page}&limit=${limit}`);
        resolve(response);
      }, 2000)
    );
    dispatch({ type: types.FETCH_BUSES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_BUSES_FAILURE, payload: e.message });
  }
};

export const fetchSingleBus = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_BUS_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.get(`/buses/${id}`);
        resolve(response);
      }, 2000)
    );
    dispatch({
      type: types.FETCH_SINGLE_BUS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.FETCH_SINGLE_BUS_RESET, payload: e.message });
  }
};

export const deleteBus = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_BUS_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.delete(`/buses/${id}`);
        resolve(response);
      }, 2000)
    );
    dispatch({ type: types.DELETE_BUS_UPDATE_LIST , payload: id});

    dispatch({
      type: types.DELETE_BUS_SUCCESS,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_BUS_FAILURE, payload: e.message });
  }
};

export const resetCreateBus = () => {
  return {
    type: types.CREATE_BUS_RESET,
  };
};

export const resetFetchBuses = () => {
  return {
    type: types.FETCH_BUSES_RESET,
  };
};

export const resetFetchSingleBus = () => ({
  type: types.FETCH_SINGLE_BUS_RESET,
});

export const resetDeleteBus = () => ({
  type: types.DELETE_BUS_RESET,
});
