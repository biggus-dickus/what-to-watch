import Route from '../config/routes';
import {Film} from '../types'; // eslint-disable-line


const FilmDataAdapter = (data: any): Film => {
  return {
    bgColor: data.background_color,
    bgImage: data.background_image,
    description: data.description,
    director: data.director,
    genre: data.genre,
    id: data.id,
    isFavourite: data.is_favorite,
    name: data.name,
    pageUrl: Route.FILM.replace(`:id`, data.id),
    posterImage: data.poster_image,
    previewImage: data.preview_image,
    previewVideo: data.preview_video_link,
    rating: data.rating,
    released: data.released,
    runTime: data.run_time,
    scoresCount: data.scores_count,
    starring: data.starring,
    video: data.video_link
  };
};

export default FilmDataAdapter;
