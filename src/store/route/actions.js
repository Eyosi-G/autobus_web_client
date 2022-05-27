import * as types from "./types";
import axios from "../../utils/axios";

export const createRoute = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ROUTE_REQUEST });
    await axios().post("/routes", data);
    dispatch({ type: types.CREATE_ROUTE_SUCCESS });
  } catch (e) {
    dispatch({ type: types.CREATE_ROUTE_FAILURE, payload: e.message });
  }
};

export const fetchRoutes = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_ROUTES_REQUEST });
    const response = await axios().get(`/routes?page=${page}&limit=${limit}`);
    dispatch({ type: types.FETCH_ROUTES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_ROUTES_FAILURE, payload: e.message });
  }
};

export const fetchSingleRoute = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_ROUTE_REQUEST });
    const response = await axios().get(`/routes/${id}`);
    dispatch({
      type: types.FETCH_SINGLE_ROUTE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.FETCH_SINGLE_ROUTE_RESET, payload: e.message });
  }
};

export const deleteRoute = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ROUTE_REQUEST });
    const response = await axios().delete(`/routes/${id}`);
    dispatch({ type: types.DELETE_ROUTE_UPDATE_LIST, payload: id });

    dispatch({
      type: types.DELETE_ROUTE_SUCCESS,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_ROUTE_FAILURE, payload: e.message });
  }
};

export const searchRoutes = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.SEARCH_ROUTE_REQUEST });
    const response = await axios().post(`/routes/search`, data);
    dispatch({ type: types.SEARCH_ROUTE_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.SEARCH_ROUTE_FAILURE, payload: e.message });
  }
};

export const resetCreateRoute = () => {
  return {
    type: types.CREATE_ROUTE_RESET,
  };
};

export const resetFetchRoutes = () => {
  return {
    type: types.FETCH_ROUTES_RESET,
  };
};

export const resetFetchSingleRoute = () => ({
  type: types.FETCH_SINGLE_ROUTE_RESET,
});

export const resetDeleteRoute = () => ({
  type: types.DELETE_ROUTE_RESET,
});

export const resetSearchRoute = () => ({
  type: types.SEARCH_ROUTE_RESET,
});
