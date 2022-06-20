import axios from "../../utils/axios";
import * as types from "./types";
export const fetchStops = () => async (dispatch) => {
  try {
    dispatch({ type: types.FETCH_STOPS_REQUEST });
    const response = await axios().get("/terminals");
    dispatch({ type: types.FETCH_STOPS_SUCCESS, payload: response.data });
  } catch (e) {
    if(e.response && e.response.data){
      dispatch({ type: types.FETCH_STOPS_FAILURE, payload: e.response.data.message });
    }else{
      dispatch({ type: types.FETCH_STOPS_FAILURE, payload: e.message });
    }
  }
};


export const resetStops = ()=>({
    type: types.FETCH_STOPS_RESET
})