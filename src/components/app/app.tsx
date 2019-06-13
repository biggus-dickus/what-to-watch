import * as React from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';

import {Film, Genre} from '../../types/types'; // eslint-disable-line

import RouteConfig from '../../config/routes';

import * as DataSelector from '../../store/reducers/data/selectors';
import {ActionCreator} from '../../store/actions';
import {getUserData} from '../../store/reducers/user/selectors';

import PrivateRoute from '../../hocs/private-route';
import PropsRoute from '../../hocs/props-route';

import Main from '../main/main';
import MyList from '../my-list/my-list';
import NoMatch from '../no-match/no-match';
import SignIn from '../sign-in/sign-in';


interface Props extends Genre {
  filteredMovies?: Array<string>,
  movies: Array<Film>,
  userData: object
}


export class App extends React.PureComponent<Props, {}> {
  render() {
    const {currentGenre, filteredMovies, genres, movies, userData} = this.props;

    return (
      <Switch>
        <PrivateRoute
          path={RouteConfig.SIGN_IN}
          redirectTo={RouteConfig.MY_LIST}
          exact
          component={SignIn}
          isPrivate={!!userData}
          {...{userData}} />

        <PropsRoute
          path={RouteConfig.INDEX}
          exact
          component={Main}
          movies={(filteredMovies.length) ? filteredMovies : movies}
          onGenreChange={this._handleGenreChange}
          {...{currentGenre, genres, userData}} />

        <PrivateRoute
          path={RouteConfig.MY_LIST}
          redirectTo={RouteConfig.SIGN_IN}
          exact
          component={MyList}
          isPrivate={!userData}
          {...{userData}} />

        <NoMatch />
      </Switch>
    );
  }

  _handleGenreChange = (selectedGenre) => this.props.onGenreChange(selectedGenre);
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
