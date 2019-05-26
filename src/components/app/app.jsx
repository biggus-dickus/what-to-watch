import React from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main';


export const App = ({genres}) => <Main {...{genres}} />;
export default App;

App.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};
