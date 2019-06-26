import * as React from 'react';
import {Link} from 'react-router-dom';

import RouteConfig from '../../../config/routes';

interface Props {
  filmId: number,
  isAdded: boolean,
  onAddToWatchList: (id: number) => Promise<any>,
  onRemoveFromWatchList: (id: number) => Promise<any>
}

export const FilmButtons = ({filmId, isAdded, onAddToWatchList, onRemoveFromWatchList}: Props): React.ReactElement => {
  const [isFavourite, updateIsFavourite] = React.useState(isAdded);
  React.useEffect(() => updateIsFavourite(isAdded), [isAdded]);

  let btnIcon = (
    <svg viewBox="0 0 19 20" width="19" height="20" data-test="at-is-not-added">
      <use xlinkHref="img/sprite/sprite.svg#add" />
    </svg>
  );

  let btnText = `My list`;
  let clickHandler = (id) => onAddToWatchList(id)
    .then((resp) => {
      if (resp.is_favorite) {
        updateIsFavourite(resp.is_favorite);
      }
    });

  if (isFavourite) {
    btnIcon = (
      <svg viewBox="0 0 18 14" width="18" height="14" data-test="at-is-added">
        <use xlinkHref="img/sprite/sprite.svg#in-list" />
      </svg>
    );

    btnText = `In my list`;
    clickHandler = (id) => onRemoveFromWatchList(id)
      .then(() => updateIsFavourite(false));
  }

  return (
    <div className="movie-card__buttons">
      <button className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="img/sprite/sprite.svg#play-s" />
        </svg>
        <span>Play</span>
      </button>

      <button
        className="btn btn--list movie-card__button"
        data-test="at-my-list-btn"
        type="button"
        onClick={clickHandler.bind(null, filmId)}>
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
