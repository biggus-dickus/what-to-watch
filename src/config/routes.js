const Route = Object.freeze({
  ADD_REVIEW: `/film/:id/review`,
  FILM: `/film/:id`,
  INDEX: `/`,
  MY_LIST: `/mylist`,
  SIGN_IN: `/login`
});

export default Route;

export const isPrivateRoute = (pathname) => {
  const myListRe = /\/mylist/;
  const addReviewRe = /\/film\/[\d]\/review/;

  return myListRe.test(pathname) || addReviewRe.test(pathname);
};
