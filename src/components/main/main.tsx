import * as React from 'react';

import * as Interface from '../../types'; // eslint-disable-line

import Catalog from '../catalog/catalog';
import FilmButtons from '../film-page/film-buttons/film-buttons';
import FilmTitle from '../film-page/film-title/film-title';
import Footer from '../partials/footer/footer';
import Logo from '../partials/logo/logo';
import UserBlock from '../partials/user-block/user-block';
import VideoPlayer from '../video-player/video-player';


interface Props extends Interface.Genre {
  isPlayerShown: boolean,
  location: Interface.Location,
  userData: Interface.User,
  movies: Array<Interface.Film>,
  promo: Interface.Film,
  onWatchListToggle: Interface.onWatchListToggleType,
  onVideoToggle: () => void
}


const Main = (props: Props): React.ReactElement => {
  const {isPlayerShown, onVideoToggle, onWatchListToggle, promo, userData} = props;

  return (
    <>
      <section className="movie-card" style={{background: promo.bgColor}}>
        <div className="movie-card__bg">
          <img src={promo.bgImage} alt={promo.name} />
        </div>

        <h1 className="visually-hidden">What to Watch</h1>

        <header className="page-header movie-card__head">
          <Logo pathname={props.location.pathname} />

          <UserBlock location={props.location} user={userData} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promo.posterImage} alt={`${promo.name} poster`} />
            </div>

            <div className="movie-card__desc">
              <FilmTitle
                name={promo.name}
                genre={promo.genre}
                released={promo.released} />

              <FilmButtons
                filmId={promo.id}
                isAdded={promo.isFavourite}
                isPromo={true}
                onPlayerLaunch={onVideoToggle}
                {...{onWatchListToggle}} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog {...props} />

        <Footer pathname={props.location.pathname} />
      </div>

      <VideoPlayer
        show={isPlayerShown}
        duration={promo.runTime}
        filmName={promo.name}
        poster={promo.bgImage}
        src={promo.video}
        onClose={onVideoToggle} />
    </>
  );
};

export default Main;
