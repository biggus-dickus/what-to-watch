import React from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card';


const filmsList = ({films}) => (
  <div className="catalog__movies-list">
    {films.map((film) => <FilmCard key={film.picUrl} {...film} />)}
  </div>
);

filmsList.propTypes = {
  films: PropTypes.array.isRequired
};

export default filmsList;
