import * as types from "./types";

export const timeFrameListReducer = (
  state = { loading: false, error: false, data: { count: 0, timeFrames: [] } },
  action
) => {
  switch (action.type) {
    case types.DELETE_TIMEFRAME_UPDATE_LIST:
      return {
        ...state,
        data: {
          count: state.data.count - 1,
          timeFrames: state.data.timeFrames.filter(
            (timeframe) => timeframe.id !== action.payload
          ),
        },
      };
    case types.CREATE_TIMEFRAME_UPDATE_LIST:
      return {
        ...state,
        data: {
          count: state.data.count + 1,
          timeFrames: [...state.data.timeFrames, action.payload],
        },
      };
    case types.EDIT_TIMEFRAME_UPDATE_LIST:
      const _timeFrame = action.payload;
      return {
        ...state,
        data: {
          count: state.data.count,
          timeFrames: state.data.timeFrames.map((timeFrame) => {
            if (timeFrame.id === _timeFrame.id) return _timeFrame;
            return timeFrame;
          }),
        },
      };
    case types.FETCH_TIMEFRAMES_REQUEST:
      return { loading: true, data: { count: 0, timeFrames: [] }, error: null };
    case types.FETCH_TIMEFRAMES_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_TIMEFRAMES_FAILURE:
      return {
        loading: false,
        data: { count: 0, timeFrames: [] },
        error: action.payload,
      };
    case types.FETCH_TIMEFRAMES_RESET:
      return {
        loading: false,
        data: { count: 0, timeFrames: [] },
        error: null,
      };
  }
  return state;
};

export const createTimeFrameReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_TIMEFRAME_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_TIMEFRAME_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_TIMEFRAME_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.CREATE_TIMEFRAME_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const editTimeFrameReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.EDIT_TIMEFRAME_REQUEST:
      return { loading: true, success: false, error: null };
    case types.EDIT_TIMEFRAME_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.EDIT_TIMEFRAME_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.EDIT_TIMEFRAME_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const fetchSingleTimeFrameReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_SINGLE_TIMEFRAME_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_SINGLE_TIMEFRAME_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_SINGLE_TIMEFRAME_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.FETCH_SINGLE_TIMEFRAME_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};
export const deleteTimeFrameReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_TIMEFRAME_REQUEST:
      return { loading: true, data: null, error: null };
    case types.DELETE_TIMEFRAME_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.DELETE_TIMEFRAME_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.DELETE_TIMEFRAME_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};
