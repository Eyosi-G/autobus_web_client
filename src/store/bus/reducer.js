import * as types from "./types";

export const busesListReducer = (
  state = { loading: false, error: false, data: { count: 0, buses: [] } },
  action
) => {
  switch (action.type) {
    case types.DELETE_BUS_UPDATE_LIST:
      return {
        loading: false,
        error: null,
        data: {
          count: state.data.count - 1,
          buses: state.data.buses.filter((bus) => bus.id !== action.payload),
        },
      };
    case types.FETCH_BUSES_REQUEST:
      return { loading: true, data: { count: 0, buses: [] }, error: null };
    case types.FETCH_BUSES_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_BUSES_FAILURE:
      return {
        loading: false,
        data: { count: 0, buses: [] },
        error: action.payload,
      };
    case types.FETCH_BUSES_RESET:
      return { loading: false, data: { count: 0, buses: [] }, error: null };
  }
  return state;
};

export const createBusReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_BUS_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_BUS_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_BUS_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.CREATE_BUS_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const editBusReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.EDIT_BUS_REQUEST:
      return { loading: true, success: false, error: null };
    case types.EDIT_BUS_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.EDIT_BUS_SUCCESS:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.EDIT_BUS_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const fetchSingleBusReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_SINGLE_BUS_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_SINGLE_BUS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_SINGLE_BUS_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.FETCH_BUSES_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};

export const deleteBusReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_BUS_REQUEST:
      return { loading: true, data: null, error: null };
    case types.DELETE_BUS_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.DELETE_BUS_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.DELETE_BUS_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const searchBusReducer = (
  state = { loading: false, data: [], error: null },
  action
) => {
  switch (action.type) {
    case types.SEARCH_BUS_REQUEST:
      return { loading: true, data: [], error: null };
    case types.SEARCH_BUS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.SEARCH_BUS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case types.SEARCH_BUS_RESET:
      return { loading: false, data: [], error: null };
  }
  return state;
};
