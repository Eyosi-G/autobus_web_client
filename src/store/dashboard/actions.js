import * as types from "./types";
import axios from "../../utils/axios";
export const fetchDashBoard = (route, day) => async (dispatch) => {
  try {
    day = day == undefined ? "Mon" : day;
    dispatch({ type: types.FETCH_DASHBOARD_REQUEST });
    const response = await axios().get(`/dashboard?route=${route}&day=${day}`);
    dispatch({ type: types.FETCH_DASHBOARD_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: types.FETCH_DASHBOARD_FAILURE, payload: e.message });
  }
};
