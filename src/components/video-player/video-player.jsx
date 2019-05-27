import React from 'react';
import PropTypes from 'prop-types';


const HOVER_DELAY = 1000;

export default class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  render() {
    const {poster, muted, src, width, height} = this.props;

    return <video ref={this.ref} {...{poster, muted, src, width, height}} />;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isHovered && this.props.isHovered) {
      this._handleVideoPlayback();
    }

    if (prevProps.isHovered && !this.props.isHovered) {
      this._handleVideoStop();
    }
  }

  _handleVideoPlayback() {
    this._delay = setTimeout(() => this.ref.current.play(), HOVER_DELAY);
  }

  _handleVideoStop() {
    clearTimeout(this._delay);
    this.ref.current.pause();
    this.ref.current.load();
  }
}


VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
  muted: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
};
