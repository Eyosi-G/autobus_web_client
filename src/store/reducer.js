import { combineReducers } from "redux";
import {
  createDriverReducer,
  driversListReducer,
  editDriverReducer,
  fetchSingleDriverReducer,
  deleteDriverReducer,
} from "./driver/reducer";

import {
  createTicketerReducer,
  deleteTicketerReducer,
  editTicketerReducer,
  fetchSingleTicketerReducer,
  ticketerListReducer,
} from "./ticketer/reducer";

import {
  createTimeFrameReducer,
  deleteTimeFrameReducer,
  editTimeFrameReducer,
  timeFrameListReducer,
  fetchSingleTimeFrameReducer,
} from "./timeframe/reducer";

import {
  createBusReducer,
  deleteBusReducer,
  editBusReducer,
  fetchSingleBusReducer,
  busesListReducer,
  searchBusReducer,
} from "./bus/reducer";

import {
  fetchBusStatsReducer,
  createBusStatsReducer,
  fetchSingleBusStatReducer,
  editBusStatsReducer,
  deleteBusStatsReducer,
  uploadBusStatReducer,
} from "./bus_stat/reducer";

import {
  generateScheduleReducer,
  getSchedulesReducer,
} from "./schedule/reducer";
import { fetchStopsReducer } from "./stop/reducer";

import { loginReducer } from "./auth/reducer";

export default combineReducers({
  createDriver: createDriverReducer,
  driversList: driversListReducer,
  editDriver: editDriverReducer,
  fetchSingleDriver: fetchSingleDriverReducer,
  deleteDriver: deleteDriverReducer,
  createTicketer: createTicketerReducer,
  editTicketer: editTicketerReducer,
  deleteTicketer: deleteTicketerReducer,
  fetchSingleTicketer: fetchSingleTicketerReducer,
  ticketersList: ticketerListReducer,
  createTimeFrame: createTimeFrameReducer,
  editTimeFrame: editTimeFrameReducer,
  deleteTimeFrame: deleteTimeFrameReducer,
  timeFrameList: timeFrameListReducer,
  singleTimeFrame: fetchSingleTimeFrameReducer,
  createBus: createBusReducer,
  deleteBus: deleteBusReducer,
  searchBus: searchBusReducer,
  editBus: editBusReducer,
  singleBus: fetchSingleBusReducer,
  busesList: busesListReducer,
  busStatsList: fetchBusStatsReducer,
  createBusStat: createBusStatsReducer,
  fetchSingleBusStat: fetchSingleBusStatReducer,
  editBusStat: editBusStatsReducer,
  deleteBusStat: deleteBusStatsReducer,
  uploadBusStat: uploadBusStatReducer,
  generateSchedule: generateScheduleReducer,
  getSchedules: getSchedulesReducer,
  fetchStops: fetchStopsReducer,
  login: loginReducer,
});
