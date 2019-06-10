import React from 'react';
import PropTypes from 'prop-types';

import Catalog from '../catalog/catalog';
import Footer from '../partials/footer/footer';
import Logo from '../partials/logo/logo';
import UserBlock from '../partials/user-block/user-block';

import grandBudapest from '../../../public/img/the-grand-budapest-hotel-poster.jpg';
import grandBudapestBg from '../../../public/img/bg-the-grand-budapest-hotel.jpg';


const Main = (props) => {
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
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">Drama</span>
                <span className="movie-card__year">2014</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="img/sprite/sprite.svg#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="img/sprite/sprite.svg#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
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

Main.propTypes = {
  location: PropTypes.object.isRequired,
  userData: PropTypes.object
};

export default Main;
