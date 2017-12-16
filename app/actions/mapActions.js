import {makeActionCreator} from './makeActionCreator';

export const GET_GEOJSON_REQUEST = 'GET_GEOJSON_REQUEST';
export const GET_GEOJSON_RESPONSE = 'GET_GEOJSON_RESPONSE';
export const GET_VEHICLES_LOCATIONS_REQUEST = 'GET_VEHICLES_LOCATIONS_REQUEST';
export const GET_VEHICLES_LOCATIONS_RESPONSE = 'GET_VEHICLES_LOCATIONS_RESPONSE';

export const GetGeoJsonRequest = makeActionCreator(GET_GEOJSON_REQUEST);
export const GetGeoJsonResponse = makeActionCreator(GET_GEOJSON_RESPONSE);
export const GetVehicleLocationsRequest = makeActionCreator(GET_VEHICLES_LOCATIONS_REQUEST);
export const GetVehicleLocationsResponse = makeActionCreator(GET_VEHICLES_LOCATIONS_RESPONSE);
