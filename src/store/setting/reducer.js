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

export const fetchUserReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_USER_REQUEST:
      return { data: null, error: null, loading: true };
    case types.FETCH_USER_SUCCESS:
      return { data: action.payload, error: null, loading: false };
    case types.FETCH_USER_FAILURE:
      return { data: null, error: action.payload, loading: false };
    case types.FETCH_USER_RESET:
      return { data: null, error: null, loading: false };
  }
  return state;
};

export const adminChangeOtherPasswordReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case types.ADMIN_CHANGE_OTHER_PASSWORD_REQUEST:
      return { success: false, error: null, loading: true };
    case types.ADMIN_CHANGE_OTHER_PASSWORD_SUCCESS:
      return { success: true, error: null, loading: false };
    case types.ADMIN_CHANGE_OTHER_PASSWORD_FAILURE:
      return { success: false, error: action.payload, loading: false };
    case types.ADMIN_CHANGE_OTHER_PASSWORD_RESET:
      return { success: false, error: null, loading: false };
  }
  return state;
};
