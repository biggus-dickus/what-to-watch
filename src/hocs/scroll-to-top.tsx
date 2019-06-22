import * as React from 'react';
import {withRouter} from 'react-router-dom';

import scrollTo from '../utilities/scroll-to';

/**
 * Every time the route is changed, the page needs to be scrolled to the top
 * so that it is more noticeable that something happened.
 * This small wrapper component will handle this issue.
 * Preferably, use it at the very top of your app, but below BrowserRouter.
 * @param {Object} props
 * @return {ReactElement}
 */
const ScrollToTop = (props: any): React.ReactElement => {
  const [prevPathname, updatePathname] = React.useState(``);

  if (prevPathname !== props.location.pathname) {
    scrollTo(0);
    updatePathname(props.location.pathname);
  }

  return props.children;
};

export default withRouter(ScrollToTop);
