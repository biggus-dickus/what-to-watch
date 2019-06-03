import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as DataSelector from '../../store/reducers/data/selectors';
import {ActionCreator} from '../../store/actions';

import Main from '../main/main';


export class App extends React.PureComponent {
  render() {
    const {currentGenre, filteredMovies, genres, movies} = this.props;

    return <Main
      {...{currentGenre, genres}}
      movies={(filteredMovies.length) ? filteredMovies : movies}
      onGenreChange={this._handleGenreChange} />;
  }

  _handleGenreChange = (selectedGenre) => {
    this.props.onGenreChange(selectedGenre);
  }
}


App.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  filteredMovies: PropTypes.array,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentGenre: DataSelector.getCurrentGenre(state),
  filteredMovies: DataSelector.getFilteredMovies(state),
  genres: DataSelector.getGenres(state),
  movies: DataSelector.getMovies(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (newGenre) => dispatch(ActionCreator.changeGenre(newGenre))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
