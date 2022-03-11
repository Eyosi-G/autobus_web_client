import * as types from "./types";
const inititalState = {
  loading: false,
  success: null,
  failure: null,
};
const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case types.CREATE_DRIVER_SUCCESS:
      return { loading: false, success: action.payload, failure: null };
    case types.CREATE_DRIVER_REQUEST:
      return { loading: true, success: null, failure: null };
    case types.CREATE_DRIVER_FAILURE:
      return { loading: false, success: null, failure: action.payload };
    case types.RESET_DRIVER:
      return { loading: false, success: null, failure: null };
  }
  return state;
};
export default reducer;
