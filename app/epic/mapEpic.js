import {Observable} from 'rxjs';
import {GET_GEOJSON_REQUEST, GetGeoJsonResponse} from '../actions';
import * as d3 from 'd3';

const handleReactiveLocation = locationJson => {
  return new Observable(observer => {
    d3.json(locationJson, function (err, geojson) {
      if (err) {
        observer.error(err);
      }
      observer.next(geojson);
    });
  });
};


const getGeoJson = action$ => {
  return action$
    .ofType(GET_GEOJSON_REQUEST)
    .switchMap(action => handleReactiveLocation(action.payload))
    .delay(500) // simulate a delay to see the loader
    .take(1)
    .map(resp => GetGeoJsonResponse(resp));
};

export const mapEpic = [
  getGeoJson
];
