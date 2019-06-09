import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {BASE_HOST} from '../../../config/api-endpoints';
import Route from '../../../config/routes';

import WrappingLink from '../../../hocs/wrapping-link';


const UserBlock = ({location, user}) => {
  return (
    <div className="user-block">
      {(user && user.name) ? (
        <WrappingLink
          to={Route.MY_LIST}
          isEqualCurrentPath={location.pathname === Route.MY_LIST}
          className="user-block__avatar">
          <img src={`${BASE_HOST}${user.avatar_url}`} alt={user.name} width="63" height="63" />
        </WrappingLink>
      ) : (
        <Link to={Route.SIGN_IN} className="user-block__link">
          Sign in
        </Link>
      )}
    </div>
  );
};

UserBlock.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string, // eslint-disable-line
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
  })
};

export default UserBlock;
