import {ActionCreator} from './actions';
import {ActionType} from './action-types';
import {ApiEndpoint} from '../config/api-endpoints';
import {StatusCode} from '../config/status-codes';


// all 403 errors are processed by interceptor in api
export const Operation = {
  loadMovies: () => (dispatch, _getState, api) => {
    return api.get(ApiEndpoint.FILMS)
      .then((response) => dispatch(ActionCreator.loadMovies(response.data)));
  },

  getUserData: () => (dispatch, _getState, api) => {
    return api.get(ApiEndpoint.LOGIN)
      .then((response) => {
        if (response.data) {
          dispatch(ActionCreator.getUserData(response.data));
        }
      })
      .catch((e) => dispatch(ActionCreator.getNetworkError(e)));
  },

  fetchPromo: () => (dispatch, _getState, api) => {
    return api.get(ApiEndpoint.PROMO)
      .then((response) => dispatch(ActionCreator.getPromoMovie(response.data)));
  },

  tryLogin: (email, password) => (dispatch, _getState, api) => {
    const onFail = (error) => dispatch(ActionCreator.getAuthError(error));

    return api.post(ApiEndpoint.LOGIN, {email, password})
      .then((res) => dispatch(ActionCreator.getUserData(res.data)))
      .catch((err) => onFail(err.response.data.error));
  },

  fetchReviews: (filmId) => (dispatch, _getState, api) => {
    return api.get(`${ApiEndpoint.REVIEWS}/${filmId}`)
      .then((res) => {
        dispatch(ActionCreator.getReviews(res.data));
      })
      .catch((e) => dispatch(ActionCreator.getNetworkError({
        type: ActionType.GET_REVIEWS,
        message: e.response.data.error.message
      })));
  },

  postReview: (data) => (dispatch, _getState, api) => {
    const {filmId, comment, rating} = data;

    return api.post(`${ApiEndpoint.REVIEWS}/${filmId}`, {comment, rating})
      .then((res) => {
        if (res.response && res.response.status === StatusCode.BAD_REQUEST) {
          dispatch(ActionCreator.getNetworkError({
            type: ActionType.POST_REVIEW,
            message: res.response.data.error
          }));
        }

        return res.data;
      });
  },

  // status = 1 | 0
  toggleFavourite: (filmId, status, isPromo) => (dispatch, _getState, api) => {
    return api.post(`${ApiEndpoint.FAVOURITE}/${filmId}/${+status}`)
      .then((response) => {
        if (isPromo) {
          dispatch(ActionCreator.getPromoMovie(response.data));
          dispatch(ActionCreator.updateMovie(response.data));
          return;
        }

        dispatch(ActionCreator.updateMovie(response.data));
      })
      .catch((e) => dispatch(ActionCreator.getNetworkError(e)));
  },

  getFavourite: () => (dispatch, _getState, api) => {
    return api.get(ApiEndpoint.FAVOURITE)
      .then((response) => dispatch(ActionCreator.getWatchList(response.data)))
      .catch((e) => dispatch(ActionCreator.getNetworkError(e)));
  }
};
