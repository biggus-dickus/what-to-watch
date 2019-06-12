import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../logo/logo';


const Footer = ({pathname}) => (
  <footer className="page-footer">
    <Logo bemModifier="logo__link--light" {...{pathname}} />

    <div className="copyright">
      <p>© {new Date().getFullYear()} What to watch Ltd.</p>
    </div>
  </footer>
);

Footer.propTypes = {
  pathname: PropTypes.string.isRequired
};

export default Footer;
