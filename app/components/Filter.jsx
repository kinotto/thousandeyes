import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {getFilterState} from '../reducers/filter';
import {FilterByRouteTag} from '../actions';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      'selected': []
    };
  }
  componentWillReceiveProps(newProps) {
    let newRouteTags = newProps.filter.get('routeTags');
    let oldRouteTags = this.props.filter.get('routeTags');
    let isOldRouteTagsEmpty = !this.props.filter.get('routeTags').size;

    if (newRouteTags !== oldRouteTags && isOldRouteTagsEmpty) {
      let routeTags = newProps.filter.get('routeTags').toJS();
      // when application starts apply all the filters
      this.props.FilterByRouteTag(routeTags);
      this.setState({
        'selected': routeTags
      });
    }
  }
  isSelected(routeTag) {
    return this.state.selected.find(sel => sel === routeTag);
  }
  cleanFilters() {
    this.props.FilterByRouteTag([]);
    this.setState({
      'selected': []
    });
  }
  addRemove(routeTag) {
    let updateSelected;
    if (this.isSelected(routeTag)) {
      this.state.selected.splice(this.state.selected.indexOf(routeTag), 1);
      updateSelected = this.state.selected;
    } else {
      updateSelected = [...this.state.selected, routeTag];
    }
    this.props.FilterByRouteTag(updateSelected);
    this.setState({
      'selected': updateSelected
    });
  }

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
        <div
          className="filter__empty"
          onClick={this.cleanFilters.bind(this)}>
          Remove all filters
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  'filter': PropTypes.object,
  'FilterByRouteTag': PropTypes.func
};
const mapStateToProps = state => {
  return {
    'filter': getFilterState(state)
  };
};
export default connect(mapStateToProps, {
  FilterByRouteTag
})(Filter);
