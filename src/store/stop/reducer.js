import * as types from "./types";
export const fetchStopsReducer = (
  state = { loading: false, stops: [], error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_STOPS_REQUEST:
      return { loading: true, stops: [], error: null };
    case types.FETCH_STOPS_SUCCESS:
      return { loading: false, stops: action.payload, error: null };
    case types.FETCH_STOPS_FAILURE:
      return { loading: false, stops: [], error: action.payload };
    case types.FETCH_STOPS_RESET:
      return { loading: false, stops: [], error: null };
  }
  return state;
};
