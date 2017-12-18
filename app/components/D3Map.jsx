import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import {
  MAP,
  VEHICLE_ICON
} from '../utilities/constants';
import {getMapState} from '../reducers/d3map';
import {
  GetGeoJsonRequest,
  GetVehicleLocationsRequest
} from '../actions';


class D3Map extends Component {
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
    let vehicleLocationsRetrieved = !!newProps.d3map.getIn('vehicleLocations', 'vehicle');
    let geoJsonSize = newProps.d3map.get('geojson').size;

    if (vehicleLocationsRetrieved && !geoJsonSize) {
      // retrieve geojson
      return this.props.GetGeoJsonRequest(MAP.geojsonURL);
    }

    // render the map only once! (deep reference comparison)
    if (newProps.d3map.get('geojson') !== this.props.d3map.get('geojson')) {
      // hide loader
      d3.select('.map__updatingAlert').style('visibility', 'hidden');
      this.renderMap(this.projection, newProps.d3map.getIn(['geojson', 'features']));
    }

    if (vehicleLocationsRetrieved) {
      // show loader
      d3.select('.map__updatingAlert').style('visibility', 'visible');
      // remove any previous timeout
      this.timeoutID && clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        // hide loader
        d3.select('.map__updatingAlert').style('visibility', 'hidden');
        this.updateVehicles(this.projection, newProps.d3map.get('locationCoordinates').toJS());
      }, 1000);
    }
  }


  render() {
    return (
      <div className="map">
        <div className="map__updatingAlert">
          Updating <span className="loader loader--small"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    'd3map': getMapState(state)
  };
};

D3Map.propTypes = {
  'geojson': PropTypes.object,
  'GetGeoJsonRequest': PropTypes.func,
  'GetVehicleLocationsRequest': PropTypes.func,
  'd3map': PropTypes.object
};

export default connect(mapStateToProps, {
  GetGeoJsonRequest,
  GetVehicleLocationsRequest
})(D3Map);
