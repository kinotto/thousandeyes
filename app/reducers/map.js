import {Map} from 'immutable';
import {createSelector} from 'reselect';
import {GET_GEOJSON_RESPONSE} from '../actions';

export const map = (state = Map(), action) => {
  switch (action.type) {
  case GET_GEOJSON_RESPONSE: {
    return state
      .set('geojson', Map(action.payload));
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
    return mapState;
  }
);

