import React from 'react';
import PropTypes from 'prop-types';


export default class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    this.state = {
      isPlaying: false
    };
  }

  render() {
    return <video
      ref={this.ref}
      {...this.props}
      onMouseEnter={this._handleMouseEnter}
      onMouseLeave={this._handleMouseLeave} />;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isPlaying && this.state.isPlaying) {
      this.ref.current.play();
    }

    if (prevState.isPlaying && !this.state.isPlaying) {
      this.ref.current.currentTime = 0;
    }
  }

  _handleMouseEnter = () => {
    // setTimeout(() => this.setState({isPlaying: true}), 1000);
    this.setState({isPlaying: true})
  };

  _handleMouseLeave = () => this.setState({isPlaying: false});
}


VideoPlayer.propTypes = {
  muted: PropTypes.bool,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};
