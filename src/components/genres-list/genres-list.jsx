import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeGenre} from '../../store/actions';
import GenresListItem from './list-item/genres-list-item';


export const GenresList = ({genres, currentGenre, onGenreChange}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) =>
        <GenresListItem
          key={genre}
          isActive={genre === currentGenre}
          {...{genre, onGenreChange}} />)}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (newGenre) => dispatch(changeGenre(newGenre))
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
