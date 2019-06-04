import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as DataSelector from '../../store/reducers/data/selectors';
import {getAuthState, getUserData} from '../../store/reducers/user/selectors';

import {ActionCreator} from '../../store/actions';

import Route from '../../config/routes';

import Main from '../main/main';
import SignIn from '../sign-in/sign-in';


export class App extends React.PureComponent {
  constructor(props) {
    super(props);

    // This will be removed in the next task
    this.state = {
      currentView: Route.INDEX
    };
  }

  render() {
    const {currentGenre, filteredMovies, genres, movies} = this.props;

    return (this.state.currentView === Route.SIGN_IN) ? <SignIn /> :
      <Main
        {...{currentGenre, genres}}
        movies={(filteredMovies.length) ? filteredMovies : movies}
        onGenreChange={this._handleGenreChange} />;
  }

  _handleGenreChange = (selectedGenre) => this.props.onGenreChange(selectedGenre);

  _handleViewChange = () => this.setState({currentView: Route.SIGN_IN})
}


App.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  filteredMovies: PropTypes.array,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuthRequired: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentGenre: DataSelector.getCurrentGenre(state),
  filteredMovies: DataSelector.getFilteredMovies(state),
  genres: DataSelector.getGenres(state),
  isAuthRequired: getAuthState(state),
  movies: DataSelector.getMovies(state),
  userData: getUserData(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (newGenre) => dispatch(ActionCreator.changeGenre(newGenre))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
