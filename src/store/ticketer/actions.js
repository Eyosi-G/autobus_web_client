import * as types from "./types";
import axios from "../../utils/axios";

export const createTicketer = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_TICKETER_REQUEST });
    const ticketer = await axios.post("/ticketers", data);
    dispatch({ type: types.CREATE_TICKETER_SUCCESS, payload: ticketer });
  } catch (e) {
    dispatch({ type: types.CREATE_TICKETER_FAILURE, payload: e.message });
  }
};

export const fetchTicketers = (page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_TICKETERS_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.get(
          `/ticketers?page=${page}&limit=${limit}`
        );
        resolve(response);
      }, 2000)
    );
    dispatch({ type: types.FETCH_TICKETERS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_TICKETERS_FAILURE, payload: e.message });
  }
};

export const fetchSingleTicketer = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_TICKETER_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.get(`/ticketers/${id}`);
        resolve(response);
      }, 2000)
    );
    dispatch({
      type: types.FETCH_SINGLE_TICKETER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.FETCH_SINGLE_TICKETER_RESET, payload: e.message });
  }
};


export const deleteTicketer = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_TICKETER_REQUEST });
    const response = await new Promise((resolve, reject) =>
      setTimeout(async () => {
        const response = await axios.delete(`/ticketers/${id}`);
        resolve(response);
      }, 2000)
    );
    dispatch({
      type: types.DELETE_TICKETER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({ type: types.DELETE_TICKETER_FAILURE, payload: e.message });
  }
};


export const resetCreateTicketer = () => {
  return {
    type: types.CREATE_TICKETER_RESET,
  };
};

export const resetFetchTicketers = () => {
  return {
    type: types.FETCH_TICKETERS_RESET,
  };
};

export const resetFetchSingleTicketer = () => ({
  type: types.FETCH_SINGLE_TICKETER_RESET,
});

export const resetDeleteTicketer = ()=>({
  type: types.DELETE_TICKETER_RESET
})

