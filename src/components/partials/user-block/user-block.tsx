import * as React from 'react';
import {Link} from 'react-router-dom';

import {Location, User} from '../../../types/types'; // eslint-disable-line

import {BASE_HOST} from '../../../config/api-endpoints';
import Route from '../../../config/routes';

import WrappingLink from '../../../hocs/wrapping-link';

interface Props {
  location: Location,
  user: User
}


const UserBlock = ({location, user}: Props) => {
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

export default UserBlock;
