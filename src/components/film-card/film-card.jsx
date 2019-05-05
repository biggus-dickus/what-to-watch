import PropTypes from 'prop-types';
import React from 'react';

const filmCard = ({name, picUrl, pageUrl, clickHandler}) => (
  <article className="small-movie-card catalog__movies-card" tabIndex="0">
    <button className="small-movie-card__play-btn" type="button">Play</button>

    <div className="small-movie-card__image">
      <img src={picUrl} alt={name} width="280" height="175" />
    </div>

    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href={pageUrl} onClick={clickHandler}>{name}</a>
    </h3>
  </article>
);

filmCard.propTypes = {
  name: PropTypes.string.isRequired,
  picUrl: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};

export default filmCard;
