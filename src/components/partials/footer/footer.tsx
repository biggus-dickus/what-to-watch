import * as React from 'react';

import Logo from '../logo/logo';

interface Props {pathname: string}


const Footer = ({pathname}: Props) => (
  <footer className="page-footer">
    <Logo bemModifier="logo__link--light" {...{pathname}} />

    <div className="copyright">
      <p>© {new Date().getFullYear()} What to watch Ltd.</p>
    </div>
  </footer>
);

export default Footer;
