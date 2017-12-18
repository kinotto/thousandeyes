import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>San Francisco Vehicles Map</h1>
        <p>polling for new requests every 15s</p>
      </div>
    );
  }
}
