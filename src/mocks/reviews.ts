import {Review} from '../types'; // eslint-disable-line

export const mockReviews: Review[] = [
  {
    id: 1,
    user: {id: 19, name: `Christina`},
    rating: 4,
    comment: `I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.`,
    date: `2019-06-17T16:39:57.295Z`
  }, {
    id: 2,
    user: {id: 14, name: `Corey`},
    rating: 3,
    comment: `Unfortunately we don't have a reliable way to tell the true ratings of a movie.`,
    date: `2019-06-20T16:39:57.295Z`
  }, {
    id: 3,
    user: {id: 13, name: `Zak`},
    rating: 4,
    comment: `I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.`,
    date: `2019-06-12T16:39:57.295Z`
  }
];
