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

export const resetFetchBusStats = () => ({
  type: types.FETCH_BUS_STATS_RESET,
});

export const resetCreateBusStat = () => ({
  type: types.CREATE_BUS_STAT_RESET,
});
