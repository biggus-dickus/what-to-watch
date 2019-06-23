import * as React from 'react';
import {StaticRouter as Router} from 'react-router';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {EMAIL_NAME, PASSWORD_NAME} from './form-fields';
import formFields from './form-fields';
import {mockLocation} from '../../mocks/user';

import {SignInView} from './sign-in';

configure({adapter: new Adapter()});


const props = {
  formFields,
  isFormValid: false,
  isSubmitted: false,
  onInputChange: jest.fn(),
  onStateReset: jest.fn(),
  onSubmit: jest.fn(),
  validity: {
    [EMAIL_NAME]: false,
    [PASSWORD_NAME]: false
  },
  onLoginAttempt: jest.fn(),
  location: {...mockLocation, pathname: `/login`}
};

describe(`SignInView test suite`, () => {
  it(`<SignInView /> should render correctly`, () => {
    const tree = renderer.create(<Router><SignInView {...props} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should display the loading indicator correctly`, () => {
    const wrapper = shallow(<SignInView {...props} />);
    wrapper.setState({isLoading: true});
    expect(wrapper.find(`Loader`)).toHaveLength(1);
  });

  it(`should display any existing validation error after the form is submitted`, () => {
    const wrapper = shallow(<SignInView {...props} />);
    expect(wrapper.find(`[data-test="at-validation-error"]`)).toHaveLength(0);

    wrapper.setProps({isSubmitted: true});
    expect(wrapper.find(`[data-test="at-validation-error"]`)).toHaveLength(1);
  });
});

