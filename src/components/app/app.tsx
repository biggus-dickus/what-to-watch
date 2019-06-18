import * as React from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';

import {Film, Genre, User} from '../../types'; // eslint-disable-line

import RouteConfig from '../../config/routes';

import * as DataSelector from '../../store/reducers/data/selectors';
import {ActionCreator} from '../../store/actions';
import {getUserData} from '../../store/reducers/user/selectors';

import PrivateRoute from '../../hocs/private-route';
import PropsRoute from '../../hocs/props-route';

import FilmDetails from '../film-details/film-details';
import Main from '../main/main';
import MyList from '../my-list/my-list';
import NoMatch from '../no-match/no-match';
import SignIn from '../sign-in/sign-in';


interface Props extends Genre {
  filteredMovies?: Array<Film>,
  movies: Array<Film>,
  userData: User
}


export class App extends React.PureComponent<Props, null> {
  render(): React.ReactElement {
    const {currentGenre, filteredMovies, genres, movies, userData} = this.props;

    return (
      <Switch>
        <PropsRoute
          path={RouteConfig.INDEX}
          exact
          component={Main}
          movies={(filteredMovies.length) ? filteredMovies : movies}
          onGenreChange={this._handleGenreChange}
          {...{currentGenre, genres, userData}} />

        <PrivateRoute
          path={RouteConfig.SIGN_IN}
          redirectTo={RouteConfig.MY_LIST}
          exact
          component={SignIn}
          isPrivate={!!userData}
          {...{userData}} />

        <PrivateRoute
          path={RouteConfig.MY_LIST}
          redirectTo={RouteConfig.SIGN_IN}
          exact
          component={MyList}
          isPrivate={!userData}
          {...{userData}} />

        <PropsRoute
          path={RouteConfig.FILM}
          exact
          component={FilmDetails}
          availableMovies={movies} />

        <NoMatch/>
      </Switch>
    );
  }

  _handleGenreChange = (selectedGenre: string): void => this.props.onGenreChange(selectedGenre);
}

const mapStateToProps = (state) => ({
  currentGenre: DataSelector.getCurrentGenre(state),
  filteredMovies: DataSelector.getFilteredMovies(state),
  genres: DataSelector.getGenres(state),
  movies: DataSelector.getMovies(state),
  userData: getUserData(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (newGenre) => dispatch(ActionCreator.changeGenre(newGenre))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
