import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import RouteConfig from '../../config/routes';

import * as DataSelector from '../../store/reducers/data/selectors';
import {ActionCreator} from '../../store/actions';
import {getUserData} from '../../store/reducers/user/selectors';

import PropsRoute from '../../hocs/props-route';
import PrivateRoute from '../../hocs/private-route';

import Main from '../main/main';
import MyList from '../my-list/my-list';
import NoMatch from '../no-match/no-match';
import SignIn from '../sign-in/sign-in';


export class App extends React.PureComponent {
  render() {
    const {currentGenre, filteredMovies, genres, movies, userData} = this.props;

    return (
      <Switch>
        <Route
          path={RouteConfig.SIGN_IN}
          exact
          render={(props) =>
            (userData) ?
              <Redirect
                to={{
                  pathname: RouteConfig.MY_LIST,
                  state: {from: props.location}
                }} /> :
              <SignIn {...props} />
          } />

        <PropsRoute
          path={RouteConfig.INDEX}
          exact
          component={Main}
          movies={(filteredMovies.length) ? filteredMovies : movies}
          onGenreChange={this._handleGenreChange}
          {...{currentGenre, genres, userData}} />

        <PrivateRoute
          path={RouteConfig.MY_LIST}
          exact
          component={MyList}
          isLoggedIn={!!userData}
          {...{userData}} />

        <NoMatch />
      </Switch>
    );
  }

  _handleGenreChange = (selectedGenre) => this.props.onGenreChange(selectedGenre);
}


App.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  filteredMovies: PropTypes.array,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGenreChange: PropTypes.func.isRequired,
  userData: PropTypes.object
};

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
