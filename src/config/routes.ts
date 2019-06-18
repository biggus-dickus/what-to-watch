enum Route {
  ADD_REVIEW = '/film/:id/review',
  FILM = '/film/:id',
  INDEX = '/',
  MY_LIST = '/mylist',
  SIGN_IN = '/login'
}

export default Route;

export const isPrivateRoute = (pathname: string): boolean => {
  const myListRe = /\/mylist/;
  const addReviewRe = /\/film\/[1-9][\d]*\/review/;

  return myListRe.test(pathname) || addReviewRe.test(pathname);
};
