import * as React from 'react';
import {Link} from 'react-router-dom';

import VideoPreview from '../video-preview/video-preview';

interface Props {
  name: string,
  previewImage: string,
  pageUrl: string,
  previewVideo: string
}


const FilmCard = (props: Props): React.ReactElement => {
  const {name, previewImage, pageUrl, previewVideo} = props;

  const [isHovered, setIsHovered] = React.useState(false);

  const onCardHover = () => setIsHovered(true);
  const onCardDismiss = () => setIsHovered(false);

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={onCardHover}
      onMouseLeave={onCardDismiss}>

      <Link className="small-movie-card__wrapping-link" to={pageUrl}>
        <i className="small-movie-card__play-btn" aria-hidden />
        <div className="small-movie-card__image">
          <VideoPreview
            src={previewVideo}
            poster={previewImage}
            width={280}
            height={175}
            isHovered={isHovered}
            muted />
        </div>

        <h3 className="small-movie-card__title">
          <span className="small-movie-card__link">{name}</span>
        </h3>
      </Link>
    </article>
  );
};

export default FilmCard;
