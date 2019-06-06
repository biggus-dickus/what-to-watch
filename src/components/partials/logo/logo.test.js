import React from 'react';
import renderer from 'react-test-renderer';

import Logo from './logo';

const tree = renderer.create(<Logo isHomePage={false} />).toJSON();

it(`<Logo /> should render correctly`, () => expect(tree).toMatchSnapshot());
