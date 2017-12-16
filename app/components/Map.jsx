import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Observable} from 'rxjs';
import * as d3 from 'd3';
import {MAP} from '../utilities/constants';
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
      .scale(200000)
      .translate([MAP.width / 2, MAP.height / 2]);
  }
  componentWillMount() {
    // retrieve geojson
    this.props.GetGeoJsonRequest(MAP.geojsonURL);
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
    let aa = [-122.490402, 37.786453];
    let bb = [-122.389809, 37.72728];
    d3.select('svg').selectAll('circle').remove();

    d3.select('svg')
      .selectAll('circle')
      // .data([aa, bb])
      .data(locationCoordinates)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        // console.log(projection(d));
        return projection(d)[0];
      })
      .attr('cy', function (d) {
        return projection(d)[1];
      })
      .attr('r', '8px')
      .attr('fill', 'red');
  }
  componentWillReceiveProps(newProps) {
    if (newProps.map.getIn('geojson', 'type') && !newProps.map.get('locations').size) {
      // subscribe only once to location updates after have received the geojson data
      this.props.GetVehicleLocationsRequest();
    }

    // render the map only once! (deep reference comparison)
    if (newProps.map.get('geojson') !== this.props.map.get('geojson')) {
      this.renderMap(this.projection, newProps.map.getIn(['geojson', 'features']));
    }

    this.updateVehicles(this.projection, newProps.map.get('locationCoordinates').toJS());
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
