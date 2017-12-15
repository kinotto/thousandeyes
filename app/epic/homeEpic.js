import {Observable} from 'rxjs';

const pippo = action$ => {
  return action$
    .ofType('pippo')
    .switchMap(action => {
      return Observable.of(action.payload || {});
    });
};

export const homeEpic = [
  pippo
];
