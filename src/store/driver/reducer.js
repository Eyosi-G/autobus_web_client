import * as types from "./types";

export const driversListReducer = (
  state = { loading: false, error: false, data: { count: 0, drivers: [] } },
  action
) => {
  switch (action.type) {
    case types.FETCH_DRIVERS_REQUEST:
      return { loading: true, data: { count: 0, drivers: [] }, error: null };
    case types.FETCH_DRIVERS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_DRIVERS_FAILURE:
      return {
        loading: false,
        data: { count: 0, drivers: [] },
        error: action.payload,
      };
    case types.FETCH_DRIVERS_RESET:
      return { loading: false, data: { count: 0, drivers: [] }, error: null };
  }
  return state;
};

export const createDriverReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_DRIVER_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_DRIVER_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_DRIVER_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.CREATE_DRIVER_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const editDriverReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.EDIT_DRIVER_REQUEST:
      return { loading: true, success: false, error: null };
    case types.EDIT_DRIVER_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.EDIT_DRIVER_SUCCESS:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.EDIT_DRIVER_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const fetchSingleDriverReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_SINGLE_DRIVER_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_SINGLE_DRIVER_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_SINGLE_DRIVER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.FETCH_DRIVERS_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};

export const deleteDriverReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_DRIVER_REQUEST:
      return { loading: true, data: null, error: null };
    case types.DELETE_DRIVER_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.DELETE_DRIVER_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.DELETE_DRIVER_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};
