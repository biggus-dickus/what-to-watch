import * as React from 'react';
import {ReactElement} from 'react'; // eslint-disable-line

import {INITIAL_MEDIA_VOLUME} from '../../config/config';
import {secToHms} from '../../utilities/helpers';

/* eslint-disable */
export enum PlayState {
  INITIAL = '',
  PLAY = 'is-playing',
  PAUSE = 'is-paused'
}
/* eslint-enable */

type playStateType = PlayState.INITIAL | PlayState.PLAY | PlayState.PAUSE;

interface Props {
  show: boolean,
  duration: number,
  filmName: string,
  onClose: () => void,
  poster: string,
  src: string
}

interface State {
  readonly play: playStateType,
  readonly timeElapsed: number,
  readonly timeElapsedPercentage: number,
}

const togglePreventScroll = (toggle) => {
  if (toggle) {
    document.body.classList.add(`no-scroll`);
    return;
  }

  document.body.classList.remove(`no-scroll`);
};

const TWO_DIGIT_INT = 10;
const prependZero = (val: number): string => (val < TWO_DIGIT_INT) ? `0${val}` : `${val}`;


export default class VideoPlayer extends React.PureComponent<Props, State> {
  private _ref = React.createRef<HTMLVideoElement>();
  private _interval: NodeJS.Timer;

  constructor(props) {
    super(props);

    this.state = {
      play: PlayState.INITIAL,
      timeElapsed: this.timeElapsed,
      timeElapsedPercentage: this.timeElapsedPercentage
    };
  }

  get videoDuration(): number {
    if (this._ref.current && this._ref.current.duration) {
      return this._ref.current.duration;
    }

    // Convert runTime in minutes to seconds
    return this.props.duration * 60;
  }

  get timeElapsed(): number {
    if (this._ref.current && this._ref.current.currentTime) {
      return this._ref.current.currentTime;
    }

    return 0;
  }

  get timeElapsedPercentage(): number {
    const {current} = this._ref;
    if (current && current.currentTime && current.duration) {
      return current.currentTime / current.duration * 100;
    }

    return 0;
  }

  componentDidMount(): void {
    window.addEventListener(`keyup`, this._onEscPress);
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    // Prevent scroll
    if (!prevProps.show && this.props.show) {
      togglePreventScroll(true);
    }

    // Allow scroll
    if (prevProps.show && !this.props.show) {
      togglePreventScroll(false);
    }

    if (this._ref.current) {
      // Start playback
      if (!prevState.play && this.state.play === PlayState.PLAY ||
        prevState.play === PlayState.PAUSE && this.state.play === PlayState.PLAY) {
        this._ref.current.play();
      }

      // Pause playback
      if (prevState.play === PlayState.PLAY && this.state.play === PlayState.PAUSE) {
        this._ref.current.pause();
      }
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener(`keyup`, this._onEscPress);
  }

  render(): ReactElement {
    const {show, filmName, poster, src} = this.props;
    const {play, timeElapsed, timeElapsedPercentage} = this.state;

    if (show) {
      let playBtnIcon = (
        <svg viewBox="0 0 19 19" width="19" height="19" data-test="at-play-btn-icon">
          <use xlinkHref="img/sprite/sprite.svg#play-s" />
        </svg>
      );

      let playBtnText = `Play`;

      const classList = [`player`];
      if (play === PlayState.PLAY) {
        classList.push(`is-playing`);
        if (classList.includes(`is-paused`)) {
          classList.splice(classList.indexOf(`is-paused`), 1);
        }

        playBtnIcon = (
          <svg viewBox="0 0 14 21" width="14" height="21" data-test="at-pause-btn-icon">
            <use xlinkHref="img/sprite/sprite.svg#pause" />
          </svg>
        );

        playBtnText = `Pause`;
      }

      if (play === PlayState.PAUSE) {
        classList.push(`is-paused`);
        if (classList.includes(`is-playing`)) {
          classList.splice(classList.indexOf(`is-playing`), 1);
        }
      }

      const [h, m, s] = secToHms(this.videoDuration);

      return (
        <div className={classList.join(` `)}>
          <video
            className="player__video"
            ref={this._ref}
            onPlay={this._onPlay}
            onPause={this._onPause}
            {...{poster, src}} />

          <button
            type="button"
            className="player__exit"
            data-test="at-exit-btn"
            onClick={this._onExit}>
            Exit
          </button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress
                  className="player__progress"
                  value={timeElapsed}
                  max={this.videoDuration}
                  onClick={this._setCurrentTime} />
                <button
                  type="button"
                  className="player__toggler"
                  style={{left: `${timeElapsedPercentage.toFixed(2)}%`}}>
                  Sliding thumb
                </button>
              </div>

              <div className="player__time-value">
                {prependZero(h)}:{prependZero(m)}:{prependZero(s)}
              </div>
            </div>

            <div className="player__controls-row">
              <button
                type="button"
                className="player__play"
                data-test="at-play-btn"
                onClick={this._handlePlaybackToggle}>
                {playBtnIcon}
                <span>{playBtnText}</span>
              </button>

              <div className="player__name">{filmName}</div>

              <button
                type="button"
                className="player__full-screen"
                onClick={this._handleRequestFullScreen}>
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="img/sprite/sprite.svg#full-screen" />
                </svg>
                <span>Full screen</span>
              </button>

            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  _setCurrentTime = (e): void => {
    if (this._ref.current && this.state.timeElapsed) {
      const rect = e.target.getBoundingClientRect();
      const clickSpot = e.clientX - rect.left;
      const percentage = (clickSpot / rect.width).toFixed(2);

      this._ref.current.currentTime = this.videoDuration * +percentage;
    }
  };

  _setTimings = (): void => {
    this._interval = setInterval(() => {
      this.setState({
        timeElapsed: this.timeElapsed,
        timeElapsedPercentage: this.timeElapsedPercentage
      });
    }, 1000);
  };

  _freezeTimings = (): void => {
    clearInterval(this._interval);
  };

  _clearTimings = (): void => {
    clearInterval(this._interval);
    this.setState({
      timeElapsed: 0,
      timeElapsedPercentage: 0
    });
  };

  _handleRequestFullScreen = (): void => {
    if (this._ref.current.requestFullscreen) {
      this._ref.current.requestFullscreen();
    }
  };

  _handlePlaybackToggle = (): void => {
    if (!this.state.play) {
      if (this._ref.current) {
        this._ref.current.volume = INITIAL_MEDIA_VOLUME;
      }

      this._setTimings();
      this.setState({play: PlayState.PLAY});
      return;
    }

    if (this.state.play === PlayState.PLAY) {
      this._freezeTimings();
    } else if (this.state.play === PlayState.PAUSE) {
      this._setTimings();
    }

    this.setState((state) => ({
      play: (state.play === PlayState.PLAY) ? PlayState.PAUSE : PlayState.PLAY
    }));
  };

  // Two methods below will sync the default HTML5 player with the app player
  _onPlay = (): void => {
    if (this.state.play !== PlayState.PLAY) {
      this._setTimings();
      this.setState({play: PlayState.PLAY});
    }
  };

  _onPause = (): void => {
    if (this.state.play !== PlayState.PAUSE) {
      this._freezeTimings();
      this.setState({play: PlayState.PAUSE});
    }
  };

  _onExit = (): void => {
    if (this.state.play) {
      this._ref.current.load();
      this._clearTimings();
      this.setState({play: PlayState.INITIAL});
    }

    this.props.onClose();
  };

  _onEscPress = (e: KeyboardEvent): void => {
    if (e.key === `Escape` && this.props.show) {
      this._onExit();
    }
  };
}
