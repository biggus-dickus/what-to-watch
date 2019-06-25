import axios, {AxiosInstance} from 'axios'; // eslint-disable-line

import {ApiEndpoint} from '../config/api-endpoints';
import {StatusCode} from '../config/status-codes';
import RouteConfig from '../config/routes';


export const createAPI = (onLoginFail): AxiosInstance => {
  const api = axios.create({
    baseURL: ApiEndpoint.BASE_URL,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.request.responseURL.indexOf(RouteConfig.SIGN_IN) === -1 &&
      err.response.status === StatusCode.FORBIDDEN) {
      onLoginFail();
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
