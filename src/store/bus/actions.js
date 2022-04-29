import * as types from "./types";
import axios from "../../utils/axios";

export const createBus = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BUS_REQUEST });
    await axios().post("/buses", data);
    dispatch({ type: types.CREATE_BUS_SUCCESS });
  } catch (e) {
    dispatch({ type: types.CREATE_BUS_FAILURE, payload: e.message });
  }
};

export const fetchBuses = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_BUSES_REQUEST });
    const response = await axios().get(`/buses?page=${page}&limit=${limit}`);
    dispatch({ type: types.FETCH_BUSES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_BUSES_FAILURE, payload: e.message });
  }
};

export const fetchSingleBus = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_BUS_REQUEST });
    const response = await axios().get(`/buses/${id}`);
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
    const response = await axios().delete(`/buses/${id}`);
    dispatch({ type: types.DELETE_BUS_UPDATE_LIST, payload: id });

    dispatch({
      type: types.DELETE_BUS_SUCCESS,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_BUS_FAILURE, payload: e.message });
  }
};

export const searchBuses = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.SEARCH_BUS_REQUEST });
    const response = await axios().post(`/buses/search`, data);
    dispatch({ type: types.SEARCH_BUS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.SEARCH_BUS_FAILURE, payload: e.message });
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

export const resetSearchBus = () => ({
  type: types.SEARCH_BUS_RESET,
});
