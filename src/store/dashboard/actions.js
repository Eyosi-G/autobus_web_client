import * as types from './types'
import axios from '../../utils/axios'
export const fetchDashBoard = (bus) => async (dispatch) => {
    try{
        dispatch({type: types.FETCH_DASHBOARD_REQUEST})
        const response = await axios.get(`/dashboard?bus=${bus}`);
        dispatch({type: types.FETCH_DASHBOARD_SUCCESS, payload: response.data});
    }catch(e){
        dispatch({type: types.FETCH_DASHBOARD_FAILURE, payload: e.message});
    }
}