import React from 'react';
import renderer from 'react-test-renderer';

import Input from './form-input';

const mockField = {
  htmlFormTag: `input`,
  label: `Remember me`,
  type: `checkbox`,
  name: `remember-the-fallen`,
  id: `some-checkbox`
};

const tree = renderer.create(<Input {...mockField} />).toJSON();

it(`<Input /> should render correctly`, () => expect(tree).toMatchSnapshot());
