import * as types from "./types";
export const changeEmailReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CHANGE_EMAIL_REQUEST:
      return { success: false, error: null, loading: true };
    case types.CHANGE_EMAIL_SUCCESS:
      return { success: true, error: null, loading: false };
    case types.CHANGE_EMAIL_FAILURE:
      return { success: false, error: action.payload, loading: false };
    case types.CHANGE_EMAIL_RESET:
      return { success: false, error: null, loading: false };
  }
  return state;
};

export const changePhonenumberReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CHANGE_PHONE_NUMBER_REQUEST:
      return { success: false, error: null, loading: true };
    case types.CHANGE_PHONE_NUMBER_SUCCESS:
      return { success: true, error: null, loading: false };
    case types.CHANGE_PHONE_NUMBER_FAILURE:
      return { success: false, error: action.payload, loading: false };
    case types.CHANGE_PHONE_NUMBER_RESET:
      return { success: false, error: null, loading: false };
  }
  return state;
};

export const changePasswordReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_REQUEST:
      return { success: false, error: null, loading: true };
    case types.CHANGE_PASSWORD_SUCCESS:
      return { success: true, error: null, loading: false };
    case types.CHANGE_PASSWORD_FAILURE:
      return { success: false, error: action.payload, loading: false };
    case types.CHANGE_PASSWORD_RESET:
      return { success: false, error: null, loading: false };
  }
  return state;
};
