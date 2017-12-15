
import React from 'react';
import IdeaList from '../app/components/ideas/IdeaList';
import renderer from 'react-test-renderer';
import { createMockStore } from 'redux-test-utils';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import configureStore from 'redux-mock-store';
import {Map, List} from 'immutable';
import {
  FETCH_IDEAS_REQUEST,
  FetchIdeasRequest,
  FILTER_IDEAS_REQUEST,
  FilterIdeasRequest,
  FILTER_IDEAS_BY_CATEGORY_REQUEST,
  FilterIdeasByCategoryRequest,
  FETCH_CATEGORIES_REQUEST,
  FetchCategoriesRequest
} from '../app/actions';

describe('test main components', () => {
  let store;

  beforeEach(() => {
    store = Map({
      ideas: List(),
      categories: List()
    })
    const mockStore = configureStore();
    store = mockStore(store);
  })

  it("should create an IdeaList component", () => {
    let ideaList = shallow(<IdeaList store={store} />);
    expect(ideaList).toBeTruthy();
  });

  it('should dispatch an action to fetch ideas', () => {
    let action = {
      type: FETCH_IDEAS_REQUEST
    }
    expect(FetchIdeasRequest()).toEqual(action);
  })
  it('should dispatch an action to filter ideas', () => {
    let action = {
      type: FILTER_IDEAS_REQUEST
    }
    expect(FilterIdeasRequest()).toEqual(action);
  })
  it('should dispatch an action to filter ideas by category', () => {
    let action = {
      type: FILTER_IDEAS_BY_CATEGORY_REQUEST
    }
    expect(FilterIdeasByCategoryRequest()).toEqual(action);
  })
  it('should dispatch an action to fetch the categories', () => {
    let action = {
      type: FETCH_CATEGORIES_REQUEST
    }
    expect(FetchCategoriesRequest()).toEqual(action);
  })
});
