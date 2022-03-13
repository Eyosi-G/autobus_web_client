import * as types from "./types";

export const ticketerListReducer = (
  state = { loading: false, error: false, data: { count: 0, ticketers: [] } },
  action
) => {
  switch (action.type) {
    case types.FETCH_TICKETERS_REQUEST:
      return { loading: true, data: { count: 0, ticketers: [] }, error: null };
    case types.FETCH_TICKETERS_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_TICKETERS_FAILURE:
      return {
        loading: false,
        data: { count: 0, ticketers: [] },
        error: action.payload,
      };
    case types.FETCH_TICKETERS_RESET:
      return { loading: false, data: { count: 0, ticketers: [] }, error: null };
  }
  return state;
};

export const createTicketerReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_TICKETER_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_TICKETER_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_TICKETER_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.CREATE_TICKETER_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const editTicketerReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.EDIT_TICKETER_REQUEST:
      return { loading: true, success: false, error: null };
    case types.EDIT_TICKETER_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.EDIT_TICKETER_SUCCESS:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.EDIT_TICKETER_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const fetchSingleTicketerReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_SINGLE_TICKETER_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_SINGLE_TICKETER_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_SINGLE_TICKETER_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.FETCH_TICKETERS_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};

export const deleteTicketerReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_TICKETER_REQUEST:
      return { loading: true, data: null, error: null };
    case types.DELETE_TICKETER_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.DELETE_TICKETER_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.DELETE_TICKETER_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};
