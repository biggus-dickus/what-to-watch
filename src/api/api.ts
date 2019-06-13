import axios from 'axios';

import {ApiEndpoint} from '../config/api-endpoints';
import {ActionCreator} from '../store/actions';
import {StatusCode} from '../config/status-codes';


export const createAPI = (dispatch): object => {
  const api = axios.create({
    baseURL: ApiEndpoint.BASE_URL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === StatusCode.FORBIDDEN) {
      dispatch(ActionCreator.requireAuthorization(true));
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
