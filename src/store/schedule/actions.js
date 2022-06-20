import axios from "../../utils/axios";
import * as types from "./types";
export const generateSchedule =
  (workingDays, startWorkingTime, endWorkingTime) => async (dispatch) => {
    try {
      dispatch({ type: types.GENERATE_SCHEDULE_REQUEST });
      await axios().post(
        `/schedules/generate`,
        {
          startWorkingTime,
          endWorkingTime,
          workingDays,
        },
        { timeout: 200000 }
      );
      dispatch({
        type: types.GENERATE_SCHEDULE_SUCCESS,
      });
      dispatch(getSchedules(0, 5));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch({
          type: types.GENERATE_SCHEDULE_FAILURE,
          payload: e.response.data.message,
        });
      } else {
        dispatch({
          type: types.GENERATE_SCHEDULE_FAILURE,
          payload: e.message,
        });
      }
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
      if (e.response && e.response.data) {
        dispatch({
          type: types.GET_SCHEDULE_FAILURE,
          payload: e.response.data.message,
        });
      } else {
        dispatch({
          type: types.GET_SCHEDULE_FAILURE,
          payload: e.message,
        });
      }
    }
  };

export const createSchedule = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_SCHEDULE_REQUEST });
    await axios().post(`/schedules`, data);
    dispatch({
      type: types.CREATE_SCHEDULE_SUCCESS,
    });
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch({
        type: types.CREATE_SCHEDULE_FAILURE,
        payload: e.response.data.message,
      });
    } else {
      dispatch({
        type: types.CREATE_SCHEDULE_FAILURE,
        payload: e.message,
      });
    }
  }
};

export const deleteSchedule = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SCHEDULE_REQUEST });
    await axios().delete(`/schedules/${id}`);
    dispatch({
      type: types.DELETE_SCHEDULE_SUCCESS,
    });
    dispatch(getSchedules(0, 5));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch({
        type: types.DELETE_SCHEDULE_FAILURE,
        payload: e.response.data.message,
      });
    } else {
      dispatch({
        type: types.DELETE_SCHEDULE_FAILURE,
        payload: e.message,
      });
    }
  }
};

export const fetchSingleSchedule = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_SINGLE_SCHEDULE_REQUEST });
    const response = await axios().get(`/schedules/${id}`);
    dispatch({
      type: types.FETCH_SINGLE_SCHEDULE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch({
        type: types.FETCH_SINGLE_SCHEDULE_FAILURE,
        payload: e.response.data.message,
      });
    } else {
      dispatch({
        type: types.FETCH_SINGLE_SCHEDULE_FAILURE,
        payload: e.message,
      });
    }
  }
};

export const updateSchedule = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_SCHEDULE_REQUEST });
    await axios().put(`/schedules/${id}`, data);
    dispatch({
      type: types.UPDATE_SCHEDULE_SUCCESS,
    });
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch({
        type: types.UPDATE_SCHEDULE_FAILURE,
        payload: e.response.data.message,
      });
    } else {
      dispatch({
        type: types.UPDATE_SCHEDULE_FAILURE,
        payload: e.message,
      });
    }
  }
};

export const deleteBulkSchedule = (schedules) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_BULK_SCHEDULE_REQUEST });
    console.log(schedules);
    await axios().delete(`/schedules/bulk?ids=${schedules}`);
    dispatch({
      type: types.DELETE_BULK_SCHEDULE_SUCCESS,
    });
    dispatch(getSchedules(0, 5));
  } catch (e) {
    if (e.response && e.response.data) {
      dispatch({
        type: types.DELETE_BULK_SCHEDULE_FAILURE,
        payload: e.response.data.message,
      });
    } else {
      dispatch({
        type: types.DELETE_BULK_SCHEDULE_FAILURE,
        payload: e.message,
      });
    }
  }
};

export const resetDeleteBulkSchedule = () => ({
  type: types.DELETE_BULK_SCHEDULE_RESET,
});

export const resetGenerateSchedule = () => ({
  type: types.GENERATE_SCHEDULE_RESET,
});

export const resetGetSchedules = () => ({
  type: types.GET_SCHEDULE_RESET,
});

export const resetCreateSchedule = () => ({
  type: types.CREATE_SCHEDULE_RESET,
});

export const resetDeleteSchedule = () => ({
  type: types.DELETE_SCHEDULE_RESET,
});

export const resetUpdateSchedule = () => ({
  type: types.UPDATE_SCHEDULE_RESET,
});
