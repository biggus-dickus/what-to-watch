import * as React from 'react';
import {Link} from 'react-router-dom';

import Route from '../../config/routes';


const NoMatch = (): React.ReactElement => (
  <section className="error-404">
    <h1>404, page not found</h1>
    <p>This is not the page you are looking for.</p>
    <p>Please go back or try going to the <Link to={Route.INDEX}>home page</Link>.</p>
  </section>
);

export default NoMatch;
