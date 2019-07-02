import axios, {AxiosInstance} from 'axios'; // eslint-disable-line

import {ApiEndpoint} from '../config/api-endpoints';
import {StatusCode} from '../config/status-codes';
import RouteConfig from '../config/routes';
import {SERVER_TIMEOUT} from '../config/config';


export const createAPI = (onLoginFail): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiEndpoint.BASE_URL,
    timeout: SERVER_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.request &&
      err.response.request.responseURL.indexOf(RouteConfig.SIGN_IN) === -1 &&
      err.response.status === StatusCode.FORBIDDEN) {
      onLoginFail();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
