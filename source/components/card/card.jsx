import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import clamp from '../../utils/clamp';

class Card extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ])
  };

  state = {
    alpha: 0,
    beta: 0,
    gamma: 0
  };

  isFunEnabled = false;
  isMoving = false;

  enableFun = () => {
    this.isFunEnabled = true;
  };

  handleDeviceOrientation = ({ alpha, beta, gamma }) => {
    if (!this.isFunEnabled || this.isMoving) {
      return;
    }

    this.isMoving = true;

    this.setState(
      {
        alpha,
        beta: clamp(beta, 0, 90),
        gamma: clamp(gamma, -90, 90)
      },
      () => {
        this.isMoving = false;
      }
    );
  };

  componentDidMount() {
    if (!window.DeviceOrientationEvent) {
      return;
    }

    window.addEventListener('deviceorientation', this.handleDeviceOrientation);
  }

  componentWillUnmount() {
    if (!window.DeviceOrientationEvent) {
      return;
    }

    window.removeEventListener(
      'deviceorientation',
      this.handleDeviceOrientation
    );
  }

  render() {
    return (
      <div className="card">
        <div className="card__image-area">
          <Motion
            defaultStyle={{ alpha: 0, beta: 0, gamma: 0 }}
            style={{
              alpha: spring(this.state.alpha),
              beta: spring(this.state.beta),
              gamma: spring(this.state.gamma)
            }}
          >
            {interpolatingStyles => (
              <div
                className="card__dude"
                style={
                  this.isFunEnabled
                    ? {
                        transform: `rotateX(${interpolatingStyles.beta -
                          90}deg)`
                      }
                    : {}
                }
              >
                <code style={{ display: 'none' }}>
                  <pre>{JSON.stringify(interpolatingStyles, null, 2)}</pre>
                </code>
                <img
                  src="/assets/metal.jpg"
                  alt="Pelle Bjerkestrand, headshot"
                  className="card__image"
                  title="☠️"
                />
              </div>
            )}
          </Motion>
        </div>
        <div className="card__content-area">{this.props.children}</div>
      </div>
    );
  }
}

export default Card;
