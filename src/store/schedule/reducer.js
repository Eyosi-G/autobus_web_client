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
