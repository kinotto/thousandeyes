import React, {Component} from 'react';
import Header from './Header';
import Filter from './Filter';
import Map from './Map';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Filter />
        <Map />
      </div>
    );
  }
}
