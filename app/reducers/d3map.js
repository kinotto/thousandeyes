import {Map, List} from 'immutable';
import {createSelector} from 'reselect';
import {
  GET_GEOJSON_RESPONSE,
  GET_VEHICLES_LOCATIONS_RESPONSE,
  FILTER_BY_ROUTETAG
} from '../actions';

const initState = () => {
  return Map({
    'geojson': Map(),
    'vehicleLocations': Map(),
    'locationCoordinates': List(),
    'filters': List()
  });
};

export const d3map = (state = initState(), action) => {
  switch (action.type) {
  case GET_GEOJSON_RESPONSE: {
    return state
      .set('geojson', Map(action.payload));
  }
  case GET_VEHICLES_LOCATIONS_RESPONSE: {
    return state
      .set('vehicleLocations', Map(action.payload));
  }
  case FILTER_BY_ROUTETAG: {
    return state
      .set('filters', List(action.payload));
  }
  default:
    return state;
  }
};


const mapSelector = state => state.get('d3map');

// memoized selector
export const getMapState = createSelector(
  [ mapSelector ],
  mapState => {
    let vehicles = mapState.getIn(['vehicleLocations', 'vehicle']);
    if (vehicles) {
      let filters = mapState.get('filters');
      let locationCoordinates = List(
        vehicles
          // apply the filters first
          .filter(location => filters.some(filter => filter === location.routeTag))
          // then map to a [lon,lat] format for d3
          .map(location => [location.lon, location.lat])
      );
      mapState = mapState.set('locationCoordinates', locationCoordinates);
    }

    return mapState;
  }
);

