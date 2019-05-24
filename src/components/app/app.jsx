import React from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main';


const app = ({genres}) => <Main {...{genres}} />;

export default app;

app.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        pageUrl: PropTypes.string.isRequired,
        picUrl: PropTypes.string.isRequired
      })
  ),
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};
