import * as React from 'react';
import {Link} from 'react-router-dom';

import RouteConfig from '../../../config/routes';

interface Props {
  filmId: number,
  isAdded: boolean
}

const FilmButtons = ({filmId, isAdded}: Props): React.ReactElement => (
  <div className="movie-card__buttons">
    <button className="btn btn--play movie-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="img/sprite/sprite.svg#play-s" />
      </svg>
      <span>Play</span>
    </button>

    <button className="btn btn--list movie-card__button" type="button">
      {isAdded ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="img/sprite/sprite.svg#in-list" />
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="img/sprite/sprite.svg#add" />
        </svg>
      )}

      <span>{isAdded ? `In my list` : `My list`}</span>
    </button>

    <Link to={RouteConfig.ADD_REVIEW.replace(`:id`, `` + filmId)}
      className="btn movie-card__button">
      Add review
    </Link>
  </div>
);

export default FilmButtons;
