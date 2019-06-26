import MockAdapter from 'axios-mock-adapter';

import {createAPI} from '../../../api/api';

import {ActionType} from '../../action-types';
import {Operation} from '../../operations';
import {mockGenres} from '../../../mocks/genres';
import {mockFilms} from '../../../mocks/films';
import {mockReviews} from '../../../mocks/reviews';

import {dataReducer} from './data';

const originalState = {
  currentGenre: mockGenres[0],
  error: ``,
  genres: [],
  movies: [],
  promo: {},
  reviews: []
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
          payload: [{fake: true}]
        });
      });
  });

  it(`should make a correct API call to /comments`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const movieLoader = Operation.fetchReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return movieLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_REVIEWS,
          payload: [{fake: true}]
        });
      });
  });

  it(`should POST comments correctly`, () => {
    const reviewData = {
      filmId: 1,
      rating: `5`,
      comment: `Every sperm is sacred, every sperm is great. If a sperm is wasted, God gets quite irate.`
    };
    const {rating, comment} = reviewData;

    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const posterFunc = Operation.postReview(reviewData);

    apiMock
      .onPost(`/comments/1`, {rating, comment})
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then((response) => expect(response).toEqual([{fake: true}]));
  });

  it(`should POST a film to watch list correctly`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const posterFunc = Operation.addToFavourite(5, 1);

    apiMock
      .onPost(`/favorite/5/1`)
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then((response) => expect(response).toEqual([{fake: true}]));
  });

  it(`should remove a film from watch list correctly via POST request`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const posterFunc = Operation.addToFavourite(5, 0);

    apiMock
      .onPost(`/favorite/5/0`)
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then((response) => expect(response).toEqual([{fake: true}]));
  });

  it(`should return an error for any malformed request to server`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loaderFunc = Operation.fetchReviews(`huita666`);

    const response = {
      error: `Nothing found`
    };

    apiMock
      .onGet(`/comments/huita666`)
      .reply(400, response);

    return loaderFunc(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_NETWORK_ERROR,
          payload: response.error
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

  it(`should return obtained reviews correctly`, () => {
    expect(dataReducer(originalState, {
      type: ActionType.GET_REVIEWS,
      payload: mockReviews
    }).reviews).toEqual(mockReviews);
  });

  it(`should return original state in case the action is not passed or unknown`, () => {
    expect(dataReducer(originalState, {type: `hz`})).toEqual(originalState);
  });
});
