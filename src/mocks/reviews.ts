import {Review} from '../types'; // eslint-disable-line

export const mockReviews: Review[] = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  },
  {
    id: 2,
    user: {
      id: 13,
      name: `Bill Goodykoontz`,
    },
    rating: 8.0,
    comment: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. “The Grand Budapest Hotel” is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
    date: `2019-06-07T21:12:21.569Z`
  }
];
