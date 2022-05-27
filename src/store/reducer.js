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
  createRouteReducer,
  deleteRouteReducer,
  editRouteReducer,
  fetchSingleRouteReducer,
  routesListReducer,
  searchRouteReducer,
} from "./route/reducer";

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
import { fetchDashboardReducer } from "./dashboard/reducer";
import {
  changeEmailReducer,
  changePasswordReducer,
  changePhonenumberReducer,
} from "./setting/reducer";

import {
  createBulkBusesReducer,
  fetchBusesReducer,
  createBusReducer,
  updateBusReducer,
  deleteBusReducer
} from "./bus/reducer";
export default combineReducers({
  changeEmail: changeEmailReducer,
  changePassword: changePasswordReducer,
  changePhonenumber: changePhonenumberReducer,
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
  createRoute: createRouteReducer,
  deleteRoute: deleteRouteReducer,
  searchRoute: searchRouteReducer,
  editRoute: editRouteReducer,
  singleRoute: fetchSingleRouteReducer,
  routesList: routesListReducer,
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
  dashboard: fetchDashboardReducer,
  createBulkBuses: createBulkBusesReducer,
  fetchBuses: fetchBusesReducer,
  createBus: createBusReducer,
  updateBus: updateBusReducer,
  deleteBus: deleteBusReducer,
});
