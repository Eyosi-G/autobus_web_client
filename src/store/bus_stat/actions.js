import * as types from "./types";
import axios from "../../utils/axios";
export const fetchBusStats = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_BUS_STATS_REQUEST });
    const response = await axios.get(`/stats?page=${page}&limit=${limit}`);
    dispatch({ type: types.FETCH_BUS_STATS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_BUS_STATS_FAILURE, payload: e.message });
  }
};

export const createBusStat = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BUS_STAT_REQUEST });
    await axios.post(`/stats`, data);
    dispatch({ type: types.CREATE_BUS_STAT_SUCCESS });
  } catch (e) {
    dispatch({ type: types.CREATE_BUS_STAT_FAILURE, payload: e.message });
  }
};

export const fetchSingleBusStat = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_BUS_STAT_REQUEST });
    const response = await axios.get(`/stats/${id}`);
    dispatch({
      type: types.FETCH_SINGLE_BUS_STAT_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.FETCH_SINGLE_BUS_STAT_FAILURE, payload: e.message });
  }
};

export const editBusStat = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_BUS_STAT_REQUEST });
    await axios.patch(`/stats/${id}`, data);
    dispatch({
      type: types.EDIT_BUS_STAT_SUCCESS,
    });
  } catch (e) {
    dispatch({ type: types.EDIT_BUS_STAT_FAILURE, payload: e.message });
  }
};

export const deleteBusStat = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_BUS_STAT_REQUEST });
    await axios.delete(`/stats/${id}`);
    dispatch({
      type: types.DELETE_BUS_STAT_SUCCESS,
    });
    dispatch({
      type: types.DELETE_BUS_STAT_UPDATE_LIST,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: types.DELETE_BUS_STAT_FAILURE,
      payload: e.message,
    });
  }
};

export const uploadBusStat = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.UPLOAD_BUS_STAT_REQUEST });
    await axios.post(`/stats/upload`, data, {
      onUploadProgress: (progress) => {
        const percentCompleted = Math.round(
          (progress.loaded * 100) / progress.total
        );
        dispatch({
          type: types.UPLOAD_BUS_STAT_PROGRESS,
          payload: percentCompleted,
        });
      },
    });
    dispatch({
      type: types.UPLOAD_BUS_STAT_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: types.UPLOAD_BUS_STAT_FAILURE,
      payload: e.message,
    });
  }
};

export const resetFetchBusStats = () => ({
  type: types.FETCH_BUS_STATS_RESET,
});

export const resetCreateBusStat = () => ({
  type: types.CREATE_BUS_STAT_RESET,
});

export const resetFetchSingleBusStat = () => ({
  type: types.FETCH_SINGLE_BUS_STAT_RESET,
});

export const resetEditBusStat = () => ({
  type: types.EDIT_BUS_STAT_RESET,
});

export const resetDeleteBusStat = () => ({
  type: types.DELETE_BUS_STAT_RESET,
});


export const resetUploadBusStat = ()=>({
  type: types.UPLOAD_BUS_STAT_RESET
})