import * as React from 'react';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormInput from './form-input';

configure({adapter: new Adapter()});


describe(`FormInput test suite`, () => {
  it(`<FormInput /> should render correctly`, () => {
    const mockField = {
      htmlFormTag: `input`,
      label: `Remember me`,
      type: `checkbox`,
      name: `remember-the-fallen`,
      id: `some-checkbox`
    };

    const tree = renderer.create(<FormInput {...mockField} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render textarea correctly`, () => {
    const mockField = {
      htmlFormTag: `textarea`,
      name: `feedback`,
      id: `impressions`
    };

    const wrapper = shallow(<FormInput {...mockField} />);
    expect(wrapper.find(`textarea`)).toHaveLength(1);
  });

  it(`should render select field correctly`, () => {
    const mockField = {
      htmlFormTag: `select`,
      name: `payment-type`,
      id: `payment-type`
    };

    const options = [`visa`, `mastercard`, `amex`];

    const wrapper = shallow(
        <FormInput {...mockField}>
          {options.map((it) => <option key={it}>{it}</option>)}
        </FormInput>
    );

    const select = wrapper.find(`select`);

    expect(select).toHaveLength(1);
    expect(select.children()).toHaveLength(options.length);
  });
});

