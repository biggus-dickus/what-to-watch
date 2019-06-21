// How much time to wait in ms before playing a film preview
export const HOVER_DELAY = 1000;

// How many films to render in "More like this" section (film page)
export const MORE_LIKE_THIS_LIMIT = 4;

// Navigation tabs on film page
export const NAV_OVERVIEW_ID = `overview`;
export const NAV_DETAILS_ID = `details`;
export const NAV_REVIEWS_ID = `reviews`;
export const filmTabs = [
  {
    id: NAV_OVERVIEW_ID,
    text: `Overview`
  },
  {
    id: NAV_DETAILS_ID,
    text: `Details`
  },
  {
    id: NAV_REVIEWS_ID,
    text: `Reviews`
  },
];
