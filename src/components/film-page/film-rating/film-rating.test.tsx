import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import FilmRating from './film-rating';

configure({adapter: new Adapter()});


const props = {
  rating: 4.345,
  scoresCount: 100500
};

describe(`FilmRating test suite`, () => {
  it(`<FilmRating /> should render correctly`, () => {
    expect(renderer.create(<FilmRating {...props} />).toJSON()).toMatchSnapshot();
  });

  it(`should correctly transform rating (number) into a word evaluation`, () => {
    const wrapper = shallow(<FilmRating {...props} />);
    const node = wrapper.find(`[data-test="at-film-rating-word"]`);

    expect(node.text()).toEqual(`Very good`);
  });

  it(`should display only one digit after the point in rating value`, () => {
    const wrapper = shallow(<FilmRating {...props} />);
    const node = wrapper.find(`[data-test="at-film-rating"]`);

    expect(node.text().split(`.`)).toHaveLength(2);
  });
});

