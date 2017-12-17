import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getFilterState} from '../reducers/filter';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      'selected': []
    };
  }
  isSelected(routeTag) {
    return this.state.selected.find(sel => sel === routeTag);
  }
  addRemove(routeTag) {
    if (this.isSelected(routeTag)) {
      this.state.selected.splice(this.state.selected.indexOf(routeTag), 1);
      this.setState({
        'selected': this.state.selected
      });
    } else {
      this.setState({
        'selected': [...this.state.selected, routeTag]
      });
    }
  }
  /* shouldComponentUpdate() {
    return false;
  }*/
  render() {
    return (
      <div className="filter">
        <h2 className="filter__title">Filter by route tag</h2>
        <div className="filter__row">
          {this.props.filter.get('routeTags').map(routeTag => {
            return (
              <div
                key={Math.random() * 100}
                className={this.isSelected(routeTag) ? 'filter__el filter__el--selected' : 'filter__el'}
                onClick={this.addRemove.bind(this, routeTag)}
              >
                {routeTag}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  'filter': PropTypes.object
};
const mapStateToProps = state => {
  return {
    'filter': getFilterState(state)
  };
};
export default connect(mapStateToProps)(Filter);
