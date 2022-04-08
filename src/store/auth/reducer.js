import * as types from "./types";
let initialState = { loading: false, data: false, error: null };
let localData = localStorage.getItem("data");
if (localData) {
  initialState = {
    ...initialState,
    data: JSON.parse(localData),
  };
}
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { loading: true, data: null, error: null };
    case types.LOGIN_SUCCESS:
      return { loading: false, data: action.payload, error: null };
    case types.LOGIN_FAILURE:
      return { loading: false, data: null, error: action.payload };
    case types.LOGIN_RESET:
      return { loading: false, data: null, error: null };
  }
  return state;
};
