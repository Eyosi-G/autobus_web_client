import axios from "../../utils/axios";
import * as types from "./types";
export const generateSchedule =
  (workingDays, startWorkingTime, endWorkingTime, breaks) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.GENERATE_SCHEDULE_REQUEST });
      await axios().post(`/schedules/generate`, {
        startWorkingTime,
        endWorkingTime,
        breaks,
        workingDays,
      });
      dispatch({
        type: types.GENERATE_SCHEDULE_SUCCESS,
      });
      dispatch(getSchedules(0, 5));
    } catch (e) {
      dispatch({
        type: types.GENERATE_SCHEDULE_FAILURE,
        payload: e.message,
      });
    }
  };

export const getSchedules =
  (page = 0, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.GET_SCHEDULE_REQUEST });
      const schedule = await axios().get(
        `/schedules?page=${page}&limit=${limit}`
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

export const resetGetSchedules = () => ({
  type: types.GET_SCHEDULE_RESET,
});
