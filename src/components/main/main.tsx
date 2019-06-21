import * as React from 'react';

import Catalog from '../catalog/catalog';
import FilmButtons from '../film-page/film-buttons/film-buttons';
import FilmTitle from '../film-page/film-title/film-title';
import Footer from '../partials/footer/footer';
import Logo from '../partials/logo/logo';
import UserBlock from '../partials/user-block/user-block';

import * as Interface from '../../types'; // eslint-disable-line

const grandBudapest = require(`../../../public/img/the-grand-budapest-hotel-poster.jpg`);
const grandBudapestBg = require(`../../../public/img/bg-the-grand-budapest-hotel.jpg`);


interface Props extends Interface.Genre {
  location: Interface.Location,
  userData: Interface.User,
  movies: Array<Interface.Film>
}


const Main = (props: Props): React.ReactElement => {
  const {userData} = props;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={grandBudapestBg} alt="The Grand Budapest Hotel" width="1300" height="552" />
        </div>

        <h1 className="visually-hidden">What to Watch</h1>

        <header className="page-header movie-card__head">
          <Logo pathname={props.location.pathname} />

          <UserBlock location={props.location} user={userData} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={grandBudapest} alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <FilmTitle
                name="The Grand Budapest Hotel"
                genre="Drama"
                released={2014} />

              <FilmButtons />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog {...props} />

        <Footer pathname={props.location.pathname} />
      </div>
    </>
  );
};

export default Main;
