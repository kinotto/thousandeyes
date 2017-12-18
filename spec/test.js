
import React from 'react';
import D3Map from '../app/components/D3Map';
import Filter from '../app/components/Filter';
import { createMockStore } from 'redux-test-utils';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import configureStore from 'redux-mock-store';
import {Map, List} from 'immutable';
import {
  GET_GEOJSON_REQUEST,
  GET_VEHICLES_LOCATIONS_REQUEST,
  FILTER_BY_ROUTETAG,
  GetGeoJsonRequest,
  GetVehicleLocationsRequest,
  FilterByRouteTag
} from '../app/actions';

describe('test main components', () => {
  let store;

  beforeEach(() => {
    store = Map({
      map: Map(),
      filter: Map({
        'vehicleLocations': Map({'vehicle': []}),
        'routeTags': List()
      })
    })
    const mockStore = configureStore();
    store = mockStore(store);
  })

  it('should create a Map component', () => {
    let d3map = shallow(<D3Map store={store} />);
    expect(d3map).toBeTruthy();
  })
  it('should create a Filter component', () => {
    let filter = shallow(<Filter store={store} />);
    expect(filter).toBeTruthy();
  })

  it('should dispatch an action to fetch the geojson', () => {
    let action = {
      type: GET_GEOJSON_REQUEST
    }
    expect(GetGeoJsonRequest()).toEqual(action);
  })

  it('should dispatch an action to subscribe to polling next bus requests', () => {
    let action = {
      type: GET_VEHICLES_LOCATIONS_REQUEST
    }
    expect(GetVehicleLocationsRequest()).toEqual(action);
  })

  it('should dispatch an action to filter by routetag', () => {
    let action = {
      type: FILTER_BY_ROUTETAG
    }
    expect(FilterByRouteTag()).toEqual(action);
  })
});
