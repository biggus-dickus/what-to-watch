import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../logo/logo';


const Footer = ({isHomePage}) => (
  <footer className="page-footer">
    <Logo bemModifier="logo__link--light" {...{isHomePage}} />

    <div className="copyright">
      <p>© {new Date().getFullYear()} What to watch Ltd.</p>
    </div>
  </footer>
);

Footer.propTypes = {
  isHomePage: PropTypes.bool.isRequired
};

export default Footer;
