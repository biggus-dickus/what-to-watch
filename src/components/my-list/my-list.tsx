import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Film, Location, User} from '../../types'; // eslint-disable-line
import RouteConfig from '../../config/routes';

import {getWatchList} from '../../store/reducers/data/selectors';
import {Operation} from '../../store/operations';

import FilmsList from '../films-list/films-list';
import Footer from '../partials/footer/footer';
import Logo from '../partials/logo/logo';
import UserBlock from '../partials/user-block/user-block';


interface Props {
  location: Location,
  onGetWatchList: () => Promise<any>
  userData: User,
  watchList?: Array<Film>
}


export const MyList = (props: Props): React.ReactElement => {
  const {location, onGetWatchList, userData, watchList = []} = props;
  const {pathname} = location;

  React.useEffect(() => {
    (async function () {
      await onGetWatchList();
    })();
  }, [pathname]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo pathname={props.location.pathname} />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock location={props.location} user={userData} />
      </header>

      <section className="catalog">
        <h2 className="visually-hidden">Catalog of selected films</h2>
        {!watchList.length && (
          <p className="catalog__notification" data-test="at-no-films-notification">
            There&apos;s nothing in your watch list yet.
            Don&apos;t be shy, <Link to={RouteConfig.INDEX}>add something</Link>!
          </p>
        )}

        <FilmsList films={watchList} />
      </section>

      <Footer pathname={location.pathname} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  watchList: getWatchList(state)
});

const mapDispatchToProps = (dispatch) => ({
  onGetWatchList: () => dispatch(Operation.getFavourite())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
