import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Operation} from '../../../store/operations';

import RouteConfig from '../../../config/routes';
import {ToFavourite} from '../../../types';

interface Props {
  filmId: number,
  isAdded: boolean,
  onReviewAdd: (id: number) => Promise<any>,
  onReviewRemove: (id: number) => Promise<any>,
}

export const FilmButtons = ({filmId, isAdded, onReviewAdd, onReviewRemove}: Props): React.ReactElement => {
  let btnIcon = (
    <svg viewBox="0 0 19 20" width="19" height="20" data-test="at-is-not-added">
      <use xlinkHref="img/sprite/sprite.svg#add" />
    </svg>
  );

  let btnText = `My list`;
  let clickHandler = onReviewAdd;

  if (isAdded) {
    btnIcon = (
      <svg viewBox="0 0 18 14" width="18" height="14" data-test="at-is-added">
        <use xlinkHref="img/sprite/sprite.svg#in-list" />
      </svg>
    );

    btnText = `In my list`;
    clickHandler = onReviewRemove;
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

const mapDispatchToProps = (dispatch) => ({
  onReviewAdd: (id) => dispatch(Operation.addToFavourite(id, ToFavourite.ADD)),
  onReviewRemove: (id) => dispatch(Operation.addToFavourite(id, ToFavourite.REMOVE)),
});

export default connect(null, mapDispatchToProps)(FilmButtons);
