import {Map, List} from 'immutable';
import {createSelector} from 'reselect';
import {
  GET_GEOJSON_RESPONSE,
  GET_VEHICLES_LOCATIONS_RESPONSE
} from '../actions';

const initState = () => {
  return Map({
    'geojson': Map(),
    'vehicleLocations': Map(),
    'locationCoordinates': List()
  });
};

export const map = (state = initState(), action) => {
  switch (action.type) {
  case GET_GEOJSON_RESPONSE: {
    return state
      .set('geojson', Map(action.payload));
  }
  case GET_VEHICLES_LOCATIONS_RESPONSE: {
    return state
      .set('vehicleLocations', Map(action.payload));
  }
  default:
    return state;
  }
};


const mapSelector = state => state.get('map');

// memoized selector
export const getMapState = createSelector(
  [ mapSelector ],
  mapState => {
    let vehicles = mapState.getIn(['vehicleLocations', 'vehicle']);
    if (vehicles) {
      mapState = mapState.set('locationCoordinates',
        List(vehicles.map(location => [location.lon, location.lat]))
      );
    }

    return mapState;
  }
);

