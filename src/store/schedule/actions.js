import axios from "../../utils/axios";
import * as types from "./types";
export const generateSchedule = (timeFrameId) => async (dispatch) => {
  try {
    dispatch({ type: types.GENERATE_SCHEDULE_REQUEST });
    await axios.post(`/timeframes/schedules/generate`, {
      timeframeId: timeFrameId,
    });
    dispatch({
      type: types.GENERATE_SCHEDULE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: types.GENERATE_SCHEDULE_FAILURE,
      payload: e.message,
    });
  }
};

export const getSchedules = (timeframeId, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SCHEDULE_REQUEST });
    const schedule = await axios.get(
      `/timeframes/${timeframeId}/schedules?page=${page}&limit=${limit}`
    );
    dispatch({
      type: types.GET_SCHEDULE_SUCCESS,
      payload: schedule.data,
    });
  } catch (e) {
    dispatch({
      type: types.GET_SCHEDULE_FAILURE,
      payload: e.message,
    });
  }
};

export const resetGenerateSchedule = () => ({
  type: types.GENERATE_SCHEDULE_RESET,
});


export const resetGetSchedule = ()=>({
  type: types.GET_SCHEDULE_RESET
})