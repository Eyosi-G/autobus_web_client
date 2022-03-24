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
} from "./bus/reducer";

import {
  fetchBusStatsReducer,
  createBusStatsReducer,
} from "./bus_stat/reducer";

import { generateScheduleReducer, getSchedulesReducer } from "./schedule/reducer";

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
  editBus: editBusReducer,
  singleBus: fetchSingleBusReducer,
  busesList: busesListReducer,
  busStatsList: fetchBusStatsReducer,
  createBusStat: createBusStatsReducer,
  generateSchedule: generateScheduleReducer,
  getSchedules: getSchedulesReducer
});
