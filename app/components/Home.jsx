import React, {Component} from 'react';
import * as d3 from 'd3';

export default class Home extends Component {
  componentDidMount() {
    /* let chosenProjection = d3.geoMercator()
      .scale(1500)
      .center([-74, 4.5])
      .translate([450, 250]);

    let path = d3.geo.path()
      .projection(chosenProjection);
    d3.json('../../sfmaps/streets.json', (err, geoData) => {
      let p = d3.select(this.svg);
      let s = path(geoData);
      p.append('path')
        .attr('d', path(geoData));
    });*/

    let width = 960;
    let height = 500;

    // let svg = d3.select('body').append('svg');
    let svg = d3.select(this.svg);

    let projection = d3.geoMercator()
      .scale(width / 2 / Math.PI);
      // .scale(100)
      // .translate([width / 2, height / 2]);

    let path = d3.geoPath()
      .projection(projection);

    /* let line = d3.svgLine()
      .x(function (d) {
        return (parseDate(d.date));
      })
      .y(function (d) {
        return (parseFloat(d.close));
      });*/

    // let url = 'http://enjalot.github.io/wwsd/data/world/world-110m.geojson';
    let url = '../../sfmaps/world.json';
    let url2 = '../../sfmaps/arteries.json';

    d3.json(url, function (err, geojson) {
      /* svg.append('path')
        .attr('d', path(geojson));*/
      svg.append('g')
        .selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', path);
      // .attr('d', line);
    });
  }
  render() {
    return (
      <svg ref={el => {
        this.svg = el;
      }} />
    );
  }
}
