import * as React from 'react';
import renderer from 'react-test-renderer';

import Loader from './loader';

const tree = renderer.create(<Loader show={true} />).toJSON();

it(`<Loader /> should render correctly`, () => expect(tree).toMatchSnapshot());
