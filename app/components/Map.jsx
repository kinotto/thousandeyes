import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Observable} from 'rxjs';
import * as d3 from 'd3';
import {MAP} from '../utilities/constants';
import {getMapState} from '../reducers/map';
import {GetGeoJsonRequest} from '../actions';

class Map extends Component {
  componentWillMount() {
    // retrieve geojson
    this.props.GetGeoJsonRequest(MAP.geojsonURL);
  }
  componentWillReceiveProps(newProps) {
    let p = newProps.map.getIn(['geojson', 'type']);
    if (!newProps.map.getIn('geojson', 'type')) {
      return;
    }
    let projection = d3.geoMercator()
      .center([MAP.sf.lng, MAP.sf.lat])
      .scale(200000)
      .translate([MAP.width / 2, MAP.height / 2]);

    let path = d3.geoPath()
      .projection(projection);

    d3.select('.map')
      .append('svg')
      .attr('viewBox', '0 0 ' + MAP.width + ' ' + MAP.height)
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('class', 'vector')
      .selectAll('path')
      .data(newProps.map.getIn(['geojson', 'features']))
      .enter()
      .append('path')
      .attr('d', path);

    d3.select('.loader').remove();
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
  'map': PropTypes.object
};

export default connect(mapStateToProps, {
  GetGeoJsonRequest
})(Map);
