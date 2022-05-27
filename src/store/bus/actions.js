import * as types from "./types";
import axios from "../../utils/axios";

export const uploadBus = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.UPLOAD_BUS_REQUEST,
    });
    await axios().post("/buses/upload", data);
    dispatch({ type: types.UPLOAD_BUS_SUCCESS });
  } catch (e) {
    dispatch({
      type: types.UPLOAD_BUS_FAILURE,
      payload: e.message,
    });
  }
};

export const fetchBuses = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.FETCH_BUSES_REQUEST,
    });
    const response = await axios().get(`/buses?page=${page}&limit=${limit}`);
    dispatch({ type: types.FETCH_BUSES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.FETCH_BUSES_FAILURE,
      payload: e.message,
    });
  }
};

export const createBus = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.CREATE_BUS_REQUEST,
    });
    await axios().post(`/buses`, data);
    dispatch({ type: types.CREATE_BUS_SUCCESS });
    dispatch(fetchBuses(0, 5));
  } catch (e) {
    dispatch({
      type: types.CREATE_BUS_FAILURE,
      payload: e.message,
    });
  }
};

export const updateBus = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.UPDATE_BUS_REQUEST,
    });
    await axios().put(`/buses/${id}`, data);
    dispatch({ type: types.UPDATE_BUS_SUCCESS });
    dispatch(fetchBuses(0, 5));
  } catch (e) {
    dispatch({
      type: types.UPDATE_BUS_FAILURE,
      payload: e.message,
    });
  }
};

export const deleteBus = (id) => async (dispatch) => {
  try {
    await axios().delete(`/buses/${id}`);
    dispatch({ type: types.DELETE_BUS_SUCCESS, payload: id });
    dispatch(fetchBuses(0, 5));
  } catch (e) {
    dispatch({
      type: types.DELETE_BUS_FAILURE,
      payload: e.message,
    });
  }
};

export const uploadBusReset = () => {
  return {
    type: types.UPLOAD_BUS_RESET,
  };
};
export const fetchBusesReset = () => {
  return {
    type: types.FETCH_BUSES_RESET,
  };
};

export const createBusReset = () => {
  return {
    type: types.CREATE_BUS_RESET,
  };
};

export const updateBusReset = () => {
  return {
    type: types.UPDATE_BUS_RESET,
  };
};

export const deleteBusReset = () => {
  return {
    type: types.DELETE_BUS_RESET,
  };
};
