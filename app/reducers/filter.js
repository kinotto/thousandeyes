import {Map, List} from 'immutable';
import {createSelector} from 'reselect';
import {GET_VEHICLES_LOCATIONS_RESPONSE} from '../actions';

const initState = () => {
  return Map({
    'vehicleLocations': Map({'vehicle': []}),
    'routeTags': List()
  });
};
export const filter = (state = initState(), action) => {
  switch (action.type) {
  case GET_VEHICLES_LOCATIONS_RESPONSE: {
    return state
      .set('vehicleLocations', Map(action.payload));
  }
  default:
    return state;
  }
  /* if (action.type === GET_VEHICLES_LOCATIONS_RESPONSE && !state.get('routeTags').size) {
    let newState = state.set('vehicleLocations', Map(action.payload));
    let routeTags = newState
      .getIn(['vehicleLocations', 'vehicle'])
      .map(location => location.routeTag);

    return newState
      .set('routeTags', List(routeTags).toSet().toList());
  }
  return state;*/
};

const filterSelector = state => state.get('filter');

export const getFilterState = createSelector(
  [filterSelector],
  filterState => {
    // return filterState;

    let routeTags = filterState
      .getIn(['vehicleLocations', 'vehicle'])
      .map(location => location.routeTag);

    return filterState
      // transform to a Set to filter duplicates
      .set('routeTags', List(routeTags).toSet().toList());
  }
);
