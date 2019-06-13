import * as React from 'react';
import {StaticRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';

import NoMatch from './no-match';

const tree = renderer.create(<Router><NoMatch /></Router>).toJSON();

it(`<NoMatch /> should render correctly`, () => expect(tree).toMatchSnapshot());
