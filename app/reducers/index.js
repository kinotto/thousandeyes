import {combineReducers} from 'redux-immutable';
import {map} from './map';
import {filter} from './filter';

export const rootReducer = combineReducers({
  map,
  filter
});
