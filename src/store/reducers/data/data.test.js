import MockAdapter from 'axios-mock-adapter';

import {createAPI} from '../../../api/api';

import {ActionType} from '../../action-types';
import {Operation} from '../../operations';
import {mockGenres} from '../../../mocks/genres';
import {mockFilms} from '../../../mocks/films';

import {dataReducer} from './data';

const originalState = {
  currentGenre: mockGenres[0],
  genres: [],
  movies: []
};

const newState = dataReducer(originalState, {
  type: ActionType.LOAD_MOVIES,
  payload: mockFilms
});


describe(`Data reducer test suite`, () => {
  it(`should make a correct API call to /films`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const movieLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return movieLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });

  it(`should not mutate the supplied state object`, () => {
    expect(newState).not.toEqual(originalState);
  });

  it(`should collect genres based on received films`, () => {
    expect(newState.genres.length).toBeGreaterThan(0);
  });

  it(`should collect only unique genres`, () => {
    expect(new Set(newState.genres).size).toEqual(newState.genres.length);
  });

  it(`should change the genre correctly`, () => {
    expect(dataReducer(originalState, {
      type: ActionType.CHANGE_GENRE,
      payload: mockGenres[3]
    }).currentGenre).toEqual(mockGenres[3]);
  });

  it(`should return original state in case the action is not passed or unknown`, () => {
    expect(dataReducer(originalState, undefined)).toEqual(originalState);
  });
});
