import * as React from 'react';

const HOVER_DELAY = 1000;

interface Props {
  poster: string,
  src: string,
  isHovered: boolean,
  muted: boolean,
  width: number,
  height: number
}


export default class VideoPlayer extends React.PureComponent<Props, null> {
  private _delay: NodeJS.Timer;
  private _ref = React.createRef<HTMLVideoElement>();

  render() {
    const {poster, muted, src, width, height} = this.props;

    return <video ref={this._ref} {...{poster, muted, src, width, height}} />;
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
    this._delay = setTimeout(() => this._ref.current.play(), HOVER_DELAY);
  }

  _handleVideoStop() {
    clearTimeout(this._delay);
    this._ref.current.pause();
    this._ref.current.load();
  }
}
