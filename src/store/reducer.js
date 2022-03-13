import { combineReducers } from "redux";
import {
  createDriverReducer,
  driversListReducer,
  editDriverReducer,
  fetchSingleDriverReducer,
  deleteDriverReducer
} from "./driver/reducer";

export default combineReducers({
  createDriver: createDriverReducer,
  driversList: driversListReducer,
  editDriver: editDriverReducer,
  fetchSingleDriver: fetchSingleDriverReducer,
  deleteDriver: deleteDriverReducer
});
