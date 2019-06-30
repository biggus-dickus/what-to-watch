import * as React from 'react';
import {HOVER_DELAY} from '../../config/config';

interface Props {
  poster: string,
  src: string,
  isHovered: boolean,
  muted: boolean,
  width: number,
  height: number
}


export default class VideoPreview extends React.PureComponent<Props, null> {
  private _delay: NodeJS.Timer;
  private _ref = React.createRef<HTMLVideoElement>();

  render(): React.ReactElement {
    const {poster, muted, src, width, height} = this.props;

    return <video ref={this._ref} {...{poster, muted, src, width, height}} />;
  }

  componentDidUpdate(prevProps: Props): void {
    if (!prevProps.isHovered && this.props.isHovered) {
      this._handleVideoPlayback();
    }

    if (prevProps.isHovered && !this.props.isHovered) {
      this._handleVideoStop();
    }
  }

  componentWillUnmount(): void {
    this._handleVideoStop();
  }

  _handleVideoPlayback(): void {
    this._delay = setTimeout(() => this._ref.current.play(), HOVER_DELAY);
  }

  _handleVideoStop(): void {
    clearTimeout(this._delay);
    this._ref.current.pause();
    this._ref.current.load();
  }
}
