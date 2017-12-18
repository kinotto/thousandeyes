import {combineReducers} from 'redux-immutable';
import {d3map} from './d3map';
import {filter} from './filter';

export const rootReducer = combineReducers({
  d3map,
  filter
});
