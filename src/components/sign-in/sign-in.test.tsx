import * as React from 'react';
import {StaticRouter as Router} from 'react-router';
import * as renderer from 'react-test-renderer';

import formFields from './form-fields';
import {mockLocation} from '../../mocks/user';

import {SignInView} from './sign-in';


const props = {
  formFields,
  isFormValid: false,
  isSubmitted: false,
  onInputChange: jest.fn(),
  onStateReset: jest.fn(),
  onSubmit: jest.fn(),
  validity: {},
  onLoginAttempt: jest.fn(),
  location: {...mockLocation, pathname: `/login`}
};

const tree = renderer.create(<Router><SignInView {...props} /></Router>).toJSON();

it(`<SignInView /> should render correctly`, () => expect(tree).toMatchSnapshot());
