import * as types from "./types";
export const createBulkBusesReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.UPLOAD_BUS_REQUEST:
      return { loading: true, success: false, error: null };
    case types.UPLOAD_BUS_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.UPLOAD_BUS_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.UPLOAD_BUS_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
  }
  return state;
};

export const fetchBusesReducer = (
  state = { loading: false, data: { buses: [], count: 0 }, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_BUSES_REQUEST:
      return { loading: true, data: { buses: [], count: 0 }, error: null };
    case types.FETCH_BUSES_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_BUSES_FAILURE:
      return {
        loading: false,
        data: { buses: [], count: 0 },
        error: action.payload,
      };
    case types.FETCH_BUSES_RESET:
      return {
        loading: false,
        data: { buses: [], count: 0 },
        error: null,
      };
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
      return {
        loading: false,
        success: false,
        error: null,
      };
  }
  return state;
};

export const updateBusReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.UPDATE_BUS_REQUEST:
      return { loading: true, success: false, error: null };
    case types.UPDATE_BUS_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.UPDATE_BUS_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.UPDATE_BUS_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
  }
  return state;
};

export const deleteBusReducer = (
  state = { success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_BUS_SUCCESS:
      return { success: true, error: null };
    case types.DELETE_BUS_FAILURE:
      return {
        success: false,
        error: action.payload,
      };
    case types.DELETE_BUS_RESET:
      return {
        success: false,
        error: null,
      };
  }
  return state;
};
