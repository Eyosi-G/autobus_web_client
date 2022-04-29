import * as types from "./types";
import axios from "../../utils/axios";

export const createTimeFrame = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_TIMEFRAME_REQUEST });
    const response = await axios().post("/timeframes", data);

    dispatch({
      type: types.CREATE_TIMEFRAME_UPDATE_LIST,
      payload: response.data,
    });
    dispatch({ type: types.CREATE_TIMEFRAME_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.CREATE_TIMEFRAME_FAILURE, payload: e.message });
  }
};

export const editTimeFrame = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TIMEFRAME_REQUEST });
    const response = await axios().put(`/timeframes/${id}`, data);

    dispatch({
      type: types.EDIT_TIMEFRAME_SUCCESS,
      payload: response.data,
    });
    dispatch({
      type: types.EDIT_TIMEFRAME_UPDATE_LIST,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.EDIT_TIMEFRAME_FAILURE, payload: e.message });
  }
};

export const fetchTimeFrames = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_TIMEFRAMES_REQUEST });
    const response = await axios().get(`/timeframes?page=${page}&limit=${limit}`);
    dispatch({ type: types.FETCH_TIMEFRAMES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_TIMEFRAMES_FAILURE, payload: e.message });
  }
};

export const deleteTimeFrame = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_TIMEFRAME_REQUEST });
    const response = await axios().delete(`/timeframes/${id}`);
    dispatch({ type: types.DELETE_TIMEFRAME_UPDATE_LIST, payload: id });
    dispatch({
      type: types.DELETE_TIMEFRAME_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_TIMEFRAME_FAILURE, payload: e.message });
  }
};

export const fetchSingleTimeFrame = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_TIMEFRAME_REQUEST });
    const response = await axios().get(`/timeframes/${id}`);
    console.log(response)
    dispatch({
      type: types.FETCH_SINGLE_TIMEFRAME_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: types.FETCH_SINGLE_TIMEFRAME_FAILURE,
      payload: e.message,
    });
  }
};

export const resetCreateTimeFrame = () => {
  return {
    type: types.CREATE_TIMEFRAME_RESET,
  };
};

export const resetFetchTimeFrames = () => {
  return {
    type: types.FETCH_TIMEFRAMES_RESET,
  };
};

export const resetDeleteTimeFrame = () => ({
  type: types.DELETE_TIMEFRAME_RESET,
});

export const resetEditTimeFrame = () => ({
  type: types.EDIT_TIMEFRAME_RESET,
});

export const resetFetchSingleTimeFrame = () => ({
  type: types.FETCH_SINGLE_TIMEFRAME_RESET,
});
