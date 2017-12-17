import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Observable} from 'rxjs';
import * as d3 from 'd3';
import {
  MAP,
  VEHICLE_ICON
} from '../utilities/constants';
import {getMapState} from '../reducers/map';
import {
  GetGeoJsonRequest,
  GetVehicleLocationsRequest
} from '../actions';

class Map extends Component {
  constructor() {
    super();
    this.projection = d3.geoMercator()
      .center([MAP.sf.lng, MAP.sf.lat])
      .scale(MAP.scale)
      .translate([MAP.width / 2, MAP.height / 2.5]);
  }

  renderMap(projection, features) {
    let path = d3.geoPath()
      .projection(projection);

    d3.select('.map')
      .html('')
      .append('svg')
      .attr('viewBox', '0 0 ' + MAP.width + ' ' + MAP.height)
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('class', 'vector')
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('d', path);
  }

  updateVehicles(projection, locationCoordinates) {
    d3.select('svg').selectAll('image').remove();

    d3.select('svg')
      .selectAll('circle')
      .data(locationCoordinates)
      .enter()
      .append('image')
      .attr('x', coord => {
        return projection(coord)[0];
      })
      .attr('y', coord => {
        return projection(coord)[1];
      })
      .attr('width', 10)
      .attr('height', 10)
      .attr('xlink:href', VEHICLE_ICON);
  }

  componentWillMount() {
    // subscribe only once to location updates
    this.props.GetVehicleLocationsRequest();
  }

  componentWillReceiveProps(newProps) {
    let vehicleLocationsRetrieved = !!newProps.map.getIn('vehicleLocations', 'vehicle');
    let geoJsonSize = newProps.map.get('geojson').size;
    if (vehicleLocationsRetrieved && !geoJsonSize) {
      // retrieve geojson
      return this.props.GetGeoJsonRequest(MAP.geojsonURL);
    }

    // render the map only once! (deep reference comparison)
    if (newProps.map.get('geojson') !== this.props.map.get('geojson')) {
      this.renderMap(this.projection, newProps.map.getIn(['geojson', 'features']));
    }

    if (vehicleLocationsRetrieved) {
      this.updateVehicles(this.projection, newProps.map.get('locationCoordinates').toJS());
    }
  }


  render() {
    return (
      <div className="map">
        <div className="loader loader--center" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    'map': getMapState(state)
  };
};

Map.propTypes = {
  'geojson': PropTypes.object,
  'GetGeoJsonRequest': PropTypes.func,
  'GetVehicleLocationsRequest': PropTypes.func,
  'map': PropTypes.object
};

export default connect(mapStateToProps, {
  GetGeoJsonRequest,
  GetVehicleLocationsRequest
})(Map);
