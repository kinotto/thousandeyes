import React, {Component} from 'react';
import Header from './Header';
import Filter from './Filter';
import D3Map from './D3Map';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Filter />
        <D3Map />
      </div>
    );
  }
}
