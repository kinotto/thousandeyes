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
};

const filterSelector = state => state.get('filter');

export const getFilterState = createSelector(
  [filterSelector],
  filterState => {
    let routeTags = filterState
      .getIn(['vehicleLocations', 'vehicle'])
      .map(location => location.routeTag);

    return filterState
      // transform to a Set to remove duplicates
      .set('routeTags', List(routeTags).toSet().toList());
  }
);
