import {Observable} from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';
import {API} from '../utilities/API';
import {POLLING_TIME_NEXT_BUS} from '../utilities/constants';
import {
  GET_GEOJSON_REQUEST,
  GET_VEHICLES_LOCATIONS_REQUEST,
  GetGeoJsonResponse,
  GetVehicleLocationsResponse
} from '../actions';
import * as d3 from 'd3';

let handleReactiveLocation = locationJson => {
  return new Observable(observer => {
    d3.json(locationJson, function (err, geojson) {
      if (err) {
        observer.error(err);
      }
      observer.next(geojson);
    });
  });
};

let vehicleAjax = () => {
  return ajax({'url': API.LOCATIONS, 'crossDomain': true})
    .map(({response}) => {
      return GetVehicleLocationsResponse(response);
    });
};
let pollingNextBus = () => {
  return Observable
    // emit locations immediatly and then every 15s
    .timer(0, POLLING_TIME_NEXT_BUS)
    .switchMap(vehicleAjax);
};


const getGeoJson = action$ => {
  return action$
    .ofType(GET_GEOJSON_REQUEST)
    .switchMap(action => handleReactiveLocation(action.payload))
    .delay(500) // simulate a delay to see the loader
    .take(1)
    .map(resp => GetGeoJsonResponse(resp));
};

const pollingVehicleLocations = action$ => {
  return action$
    .ofType(GET_VEHICLES_LOCATIONS_REQUEST)
    .switchMap(pollingNextBus);
};

export const d3mapEpic = [
  getGeoJson,
  pollingVehicleLocations
];
