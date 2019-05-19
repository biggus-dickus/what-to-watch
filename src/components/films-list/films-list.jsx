import React from 'react';
import PropTypes from 'prop-types';

import FilmCard from '../film-card/film-card';


export default class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeCard: null};
  }

  /**
   * Launch the movie preview.
   * @param {Object} activeCard
   * @return {*}
   */
  previewHandler = (activeCard) => this.setState({activeCard});

  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films.map((film) =>
          <FilmCard
            key={film.picUrl}
            onActive={this.previewHandler}
            {...film} />)}
      </div>
    );
  }
}

FilmsList.propTypes = {
  films: PropTypes.array.isRequired
};
