import Namespace from '../name-space';

const USER = Namespace.USER;

export const getAuthState = (state) => state[USER].isAuthorizationRequired;
export const getUserData = (state) => state[USER].userData;
