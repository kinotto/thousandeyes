import {combineEpics} from 'redux-observable';
import {homeEpic} from './homeEpic';


/*
entry point for redux-observable
epic is the primitive (function) used by the middleware to handle "non pure" operations (async)
that redux can't handle by design
https://redux-observable.js.org/docs/basics/Epics.html
*/
export const rootEpic = combineEpics(
  ...homeEpic,
);
