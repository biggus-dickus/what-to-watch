import * as React from 'react';
import PropTypes from 'prop-types';


const Loader = ({show}) => (
  show ? (
    <div className="loader">
      <p className="visually-hidden">Loading&hellip;</p>
    </div>
  ) : null
);

Loader.propTypes = {
  show: PropTypes.bool.isRequired
};

export default Loader;
