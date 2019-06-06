import React from 'react';
import PropTypes from 'prop-types';

import {BASE_HOST} from '../../../config/api-endpoints';
import Route from '../../../config/routes';


const UserBlock = ({user, onLinkClick}) => {
  return (
    <div className="user-block">
      {(user && user.name) ? (
        <div className="user-block__avatar">
          <img src={`${BASE_HOST}${user.avatar_url}`} alt={user.name} width="63" height="63" />
        </div>
      ) : (
        <a href={Route.SIGN_IN} className="user-block__link" onClick={onLinkClick}>
          Sign in
        </a>
      )}
    </div>
  );
};

UserBlock.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string, // eslint-disable-line
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
  })
};

export default UserBlock;
