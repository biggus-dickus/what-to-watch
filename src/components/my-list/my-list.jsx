import React from 'react';
import PropTypes from 'prop-types';

import Catalog from '../catalog/catalog';
import Footer from '../partials/footer/footer';
import Logo from '../partials/logo/logo';
import UserBlock from '../partials/user-block/user-block';


const MyList = (props) => {
  const {location, userData, selectedMovies = []} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo pathname={props.location.pathname} />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock location={props.location} user={userData} />
      </header>

      <Catalog movies={selectedMovies} />

      <Footer pathname={location.pathname} />
    </div>
  );
};

MyList.propTypes = {
  location: PropTypes.object.isRequired,
  userData: PropTypes.object,
  selectedMovies: PropTypes.arrayOf(PropTypes.object)
};

export default MyList;
