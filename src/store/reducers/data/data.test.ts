import MockAdapter from 'axios-mock-adapter';

import {createAPI} from '../../../api/api';

import {ActionType} from '../../action-types';
import {ApiEndpoint} from '../../../config/api-endpoints';
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
  reviews: [],
  watchList: []
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
      .onGet(ApiEndpoint.FILMS)
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
      .onGet(`${ApiEndpoint.REVIEWS}/1`)
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
      .onPost(`${ApiEndpoint.REVIEWS}/1`, {rating, comment})
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then((response) => expect(response).toEqual([{fake: true}]));
  });

  it(`should POST a film to watch list correctly`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const posterFunc = Operation.toggleFavourite(5, 1, false);

    apiMock
      .onPost(`${ApiEndpoint.FAVOURITE}/5/1`)
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_MOVIE,
          payload: [{fake: true}]
        });
      });
  });

  it(`should consider the case when the promo film is being updated`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const posterFunc = Operation.toggleFavourite(5, 1, true); // the 3rd argument

    apiMock
      .onPost(`${ApiEndpoint.FAVOURITE}/5/1`)
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_PROMO_MOVIE,
          payload: [{fake: true}]
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_MOVIE,
          payload: [{fake: true}]
        });
      });
  });

  it(`should remove a film from watch list correctly via POST request`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const posterFunc = Operation.toggleFavourite(5, 0);

    apiMock
      .onPost(`${ApiEndpoint.FAVOURITE}/5/0`)
      .reply(200, [{fake: true}]);

    return posterFunc(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_MOVIE,
          payload: [{fake: true}]
        });
      });
  });

  it(`should GET films from a user watch list correctly`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loaderFunc = Operation.getFavourite();

    apiMock
      .onGet(ApiEndpoint.FAVOURITE)
      .reply(200, [{fake: true}]);

    return loaderFunc(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_WATCH_LIST,
          payload: [{fake: true}]
        });
      });
  });

  it(`should return an error for any malformed request to server`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loaderFunc = Operation.fetchReviews(`huita666`);

    const response = {
      error: {
        type: ActionType.GET_REVIEWS,
        message: `Nothing found`
      }
    };

    apiMock
      .onGet(`${ApiEndpoint.REVIEWS}/huita666`)
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

  it(`should update the film correctly`, () => {
    const newMovieState = {...originalState, movies: mockFilms};
    /* eslint-disable */
    const updatedMovie =   {
      background_color: `pink`,
      background_image: `pic.png`,
      description: `Come Tatyana with a duck, we will eat and we will fuck`,
      director: `Alan Smithie`,
      is_favorite: !mockFilms[0].isFavourite,
      poster_image: `poster.jpg`,
      rating: 6.66,
      released: 1984,
      run_time: 100,
      scores_count: 100500,
      starring: [`Ben Dover`, `Major Woodie`, `Private Parts`, `I. C. Wiener`],
      video: `https://thepiratebay.org`,
      name: `Fantastic Beasts: The Crimes of Grindelwald`,
      id: 1,
      genre: `pr0n`,
      preview_image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
    };
    /* eslint-enable */

    expect(dataReducer(newMovieState, {
      type: ActionType.UPDATE_MOVIE,
      payload: updatedMovie
    }).movies[0].isFavourite).toEqual(updatedMovie.is_favorite);
  });

  it(`should return original state in case the action is not passed or unknown`, () => {
    expect(dataReducer(originalState, {type: `hz`})).toEqual(originalState);
  });
});
