import * as types from "./types";

export const fetchDashboardReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_DASHBOARD_REQUEST:
      return { loading: true, data: null, error: null };
    case types.FETCH_DASHBOARD_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.FETCH_DASHBOARD_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    case types.FETCH_DASHBOARD_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};
