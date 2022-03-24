import * as types from "./types";
export const fetchBusStatsReducer = (
  state = { loading: false, data: { count: 0, stats: [] }, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_BUS_STATS_REQUEST:
      return { loading: true, data: { count: 0, stats: [] }, error: null };
    case types.FETCH_BUS_STATS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_BUS_STATS_FAILURE:
      return {
        loading: false,
        data: { count: 0, stats: [] },
        error: action.payload,
      };
    case types.FETCH_BUS_STATS_RESET:
      return { loading: false, data: { count: 0, stats: [] }, error: null };
  }
  return state;
};

export const createBusStatsReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_BUS_STAT_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_BUS_STAT_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_BUS_STAT_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.CREATE_BUS_STAT_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};
