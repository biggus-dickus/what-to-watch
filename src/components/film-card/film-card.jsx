import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Video from '../video-player/video-player';


const filmCard = (props) => {
  const {name, picUrl, pageUrl, videoUrl} = props;

  const [isHovered, setIsHovered] = useState(false);

  const onCardHover = () => setIsHovered(true);
  const onCardDismiss = () => setIsHovered(false);

  return (
    <article className="small-movie-card catalog__movies-card"
      tabIndex="0"
      onMouseEnter={onCardHover}
      onMouseLeave={onCardDismiss}>
      <button className="small-movie-card__play-btn" type="button">Play</button>

      <div className="small-movie-card__image">
        <Video src={videoUrl}
          poster={picUrl}
          width="280"
          height="175"
          isHovered={isHovered}
          muted />
      </div>

      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={pageUrl}>{name}</a>
      </h3>
    </article>
  );
};


filmCard.propTypes = {
  name: PropTypes.string.isRequired,
  picUrl: PropTypes.string.isRequired,
  pageUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired
};

export default filmCard;
