import * as types from "./types";
export const generateScheduleReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.GENERATE_SCHEDULE_REQUEST:
      return { loading: true, success: false, error: null };
    case types.GENERATE_SCHEDULE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.GENERATE_SCHEDULE_FAILURE:
      return { loading: false, success: false, error: action.payload };
    case types.GENERATE_SCHEDULE_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const getSchedulesReducer = (
  state = { loading: false, data: { count: 0, schedules: [] }, error: null },
  action
) => {
  switch (action.type) {
    case types.GET_SCHEDULE_REQUEST:
      return { loading: true, data: { count: 0, schedules: [] }, error: null };
    case types.GET_SCHEDULE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.GET_SCHEDULE_FAILURE:
      return {
        loading: false,
        data: { count: 0, schedules: [] },
        error: action.payload,
      };

    case types.GET_SCHEDULE_RESET:
      return {
        loading: false,
        data: { count: 0, schedules: [] },
        error: null,
      };
  }
  return state;
};

export const createScheduleReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_SCHEDULE_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_SCHEDULE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_SCHEDULE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case types.CREATE_SCHEDULE_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
  }
  return state;
};

export const singleScheduleReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_SINGLE_SCHEDULE_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_SINGLE_SCHEDULE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_SINGLE_SCHEDULE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };

    case types.FETCH_SINGLE_SCHEDULE_RESET:
      return {
        loading: false,
        data: null,
        error: null,
      };
  }
  return state;
};

export const updateScheduleReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.UPDATE_SCHEDULE_REQUEST:
      return { loading: true, success: false, error: null };
    case types.UPDATE_SCHEDULE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.UPDATE_SCHEDULE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case types.UPDATE_SCHEDULE_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
  }
  return state;
};
export const deleteScheduleReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_SCHEDULE_REQUEST:
      return { loading: true, success: false, error: null };
    case types.DELETE_SCHEDULE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.DELETE_SCHEDULE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };

    case types.DELETE_SCHEDULE_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
  }
  return state;
};
