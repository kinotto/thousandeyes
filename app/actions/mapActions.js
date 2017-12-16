import {makeActionCreator} from './makeActionCreator';

export const GET_GEOJSON_REQUEST = 'GET_GEOJSON_REQUEST';
export const GET_GEOJSON_RESPONSE = 'GET_GEOJSON_RESPONSE';

export const GetGeoJsonRequest = makeActionCreator(GET_GEOJSON_REQUEST);
export const GetGeoJsonResponse = makeActionCreator(GET_GEOJSON_RESPONSE);
