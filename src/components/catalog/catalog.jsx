import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import FilmsList from '../films-list/films-list';
import GenresList from '../genres-list/genres-list';


const catalog = (props) => {
  const {filteredMovies, genres} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList {...{genres}} />

      <FilmsList films={filteredMovies} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
};

catalog.propTypes = {
  filteredMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  filteredMovies: state.movies
});

export default connect(mapStateToProps)(catalog);
