import {Film} from '../../types'; // eslint-disable-line
import {MORE_LIKE_THIS_LIMIT} from '../../config/config';


export const getFilmById = (films: Film[], id: number): Film | undefined => films.find((film) => film.id === id);

export const getMoreLikeThis = (films: Film[], genre: string, notId: number): Film[] | [] => {
  const result = films.filter((film) => film.genre === genre && film.id !== notId);

  return result.slice(0, MORE_LIKE_THIS_LIMIT);
};
