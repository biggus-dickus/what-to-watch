import React from 'react';
import PropTypes from 'prop-types';

const UserBlock = ({isLoggedIn, onLinkClick}) => {
  return (
    <div className="user-block">
      <div className="user-block__avatar">
        <img src={avatar} alt="User avatar" width="63" height="63"/>
      </div>
    </div>
  );
};

export default UserBlock;
