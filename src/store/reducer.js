import { combineReducers } from 'redux'
import driverReducer from './driver/reducer'

export default combineReducers({
    driver: driverReducer
})