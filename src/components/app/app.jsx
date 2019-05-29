import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {changeGenre} from '../../store/actions';
import {filterUnique} from '../../utilities/array-helpers';

import Main from '../main/main';


export class App extends React.Component {
  constructor(props) {
    super(props);

    const collectGenres = () => {
      const allGenres = this.props.movies
        .map((it) => it.genre)
        .reduce((all, current) => all.concat(current));

      return filterUnique(allGenres);
    };

    this.allGenres = [`All genres`].concat(collectGenres());
  }

  render() {
    return <Main
      genres={this.allGenres}
      currentGenre={this.props.currentGenre}
      movies={this.props.movies}
      onGenreChange={this._handleGenreChange} />;
  }

  _handleGenreChange = (selectedGenre) => {
    this.props.onGenreChange(selectedGenre);
  }
}

App.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  movies: state.movies
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (newGenre) => dispatch(changeGenre(newGenre))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
