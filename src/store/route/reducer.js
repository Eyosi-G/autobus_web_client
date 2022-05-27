import * as types from "./types";

export const routesListReducer = (
  state = { loading: false, error: false, data: { count: 0, routes: [] } },
  action
) => {
  switch (action.type) {
    case types.DELETE_ROUTE_UPDATE_LIST:
      return {
        loading: false,
        error: null,
        data: {
          count: state.data.count - 1,
          routes: state.data.routes.filter((bus) => bus.id !== action.payload),
        },
      };
    case types.FETCH_ROUTES_REQUEST:
      return { loading: true, data: { count: 0, routes: [] }, error: null };
    case types.FETCH_ROUTES_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_ROUTES_FAILURE:
      return {
        loading: false,
        data: { count: 0, routes: [] },
        error: action.payload,
      };
    case types.FETCH_ROUTES_RESET:
      return { loading: false, data: { count: 0, routes: [] }, error: null };
  }
  return state;
};

export const createRouteReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CREATE_ROUTE_REQUEST:
      return { loading: true, success: false, error: null };
    case types.CREATE_ROUTE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.CREATE_ROUTE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.CREATE_ROUTE_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const editRouteReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.EDIT_ROUTE_REQUEST:
      return { loading: true, success: false, error: null };
    case types.EDIT_ROUTE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.EDIT_ROUTE_SUCCESS:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.EDIT_ROUTE_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const fetchSingleRouteReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_SINGLE_ROUTE_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_SINGLE_ROUTE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_SINGLE_ROUTE_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.FETCH_ROUTES_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};

export const deleteRouteReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.DELETE_ROUTE_REQUEST:
      return { loading: true, data: null, error: null };
    case types.DELETE_ROUTE_SUCCESS:
      return { loading: false, success: true, error: null };
    case types.DELETE_ROUTE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case types.DELETE_ROUTE_RESET:
      return { loading: false, success: false, error: null };
  }
  return state;
};

export const searchRouteReducer = (
  state = { loading: false, data: [], error: null },
  action
) => {
  switch (action.type) {
    case types.SEARCH_ROUTE_REQUEST:
      return { loading: true, data: [], error: null };
    case types.SEARCH_ROUTE_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.SEARCH_ROUTE_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case types.SEARCH_ROUTE_RESET:
      return { loading: false, data: [], error: null };
  }
  return state;
};
