import * as React from 'react';

import Video from '../video-player/video-player';

interface Props {
  name: string,
  previewImage: string,
  pageUrl: string,
  previewVideo: string
}


const FilmCard = (props: Props) => {
  const {name, previewImage, pageUrl, previewVideo} = props;

  const [isHovered, setIsHovered] = React.useState(false);

  const onCardHover = () => setIsHovered(true);
  const onCardDismiss = () => setIsHovered(false);

  return (
    <article className="small-movie-card catalog__movies-card"
      tabIndex={0}
      onMouseEnter={onCardHover}
      onMouseLeave={onCardDismiss}>
      <button className="small-movie-card__play-btn" type="button">Play</button>

      <div className="small-movie-card__image">
        <Video src={previewVideo}
          poster={previewImage}
          width={280}
          height={175}
          isHovered={isHovered}
          muted />
      </div>

      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={pageUrl}>{name}</a>
      </h3>
    </article>
  );
};

export default FilmCard;
