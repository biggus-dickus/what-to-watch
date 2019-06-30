import * as React from 'react';
import {Link} from 'react-router-dom';

import {onWatchListToggleType} from '../../../types'; // eslint-disable-line

import RouteConfig from '../../../config/routes';

interface Props {
  filmId: number,
  promoId?: number,
  isAdded: boolean,
  isPromo?: boolean,
  onWatchListToggle: onWatchListToggleType,
  onPlayerLaunch: () => void
}

export const FilmButtons = ({filmId, promoId, isAdded, isPromo = false, onWatchListToggle, onPlayerLaunch}: Props): React.ReactElement => {
  let btnIcon = (
    <svg viewBox="0 0 19 20" width="19" height="20" data-test="at-is-not-added">
      <use xlinkHref="img/sprite/sprite.svg#add" />
    </svg>
  );

  let btnText = `My list`;

  if (isAdded) {
    btnIcon = (
      <svg viewBox="0 0 18 14" width="18" height="14" data-test="at-is-added">
        <use xlinkHref="img/sprite/sprite.svg#in-list" />
      </svg>
    );

    btnText = `In my list`;
  }

  // When film is toggled on film page, and it's also in promo on main page,
  // promo must be updated by reducer as well.
  // It would have been better not to create the 'promo' entity at all, but fuck it.
  const isPromoResolved = filmId === promoId || isPromo;

  return (
    <div className="movie-card__buttons">
      <button
        className="btn btn--play movie-card__button"
        data-test="at-play-btn"
        type="button"
        onClick={onPlayerLaunch}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="img/sprite/sprite.svg#play-s" />
        </svg>
        <span>Play</span>
      </button>

      <button
        className="btn btn--list movie-card__button"
        data-test="at-my-list-btn"
        type="button"
        onClick={onWatchListToggle.bind(null, filmId, !isAdded, isPromoResolved)}>
        {btnIcon}
        <span>{btnText}</span>
      </button>

      <Link
        to={RouteConfig.ADD_REVIEW.replace(`:id`, `` + filmId)}
        className="btn movie-card__button">
        Add review
      </Link>
    </div>
  );
};

export default FilmButtons;
