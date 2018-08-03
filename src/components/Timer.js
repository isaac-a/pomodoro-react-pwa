import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ title, sessionLength, breakLength }) => {
  const formatTime = minutes => {
    const h = Math.floor((minutes * 60) / 3600);
    const m = Math.floor(minutes % 60);
    const s = Math.floor((minutes * 60) % 60);
    if (h >= 1) {
      return `${(h < 10 ? '0' : '') + h}:${(m < 10 ? '0' : '') + m}:${(s <
      10
        ? '0'
        : '') + s}`;
    }
    return `${(m < 10 ? '0' : '') + m}:${(s < 10 ? '0' : '') + s}`;
  };

  return (
    <div className="timer">
      <div className="digits">
        <div className="digits-wrapper">
          <div className="digits-content">
            <span>
              {title === 'Session'
                ? formatTime(sessionLength)
                : formatTime(breakLength)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Timer.propTypes = {
  title: PropTypes.string.isRequired,
  sessionLength: PropTypes.number.isRequired,
  breakLength: PropTypes.number.isRequired
};

export default Timer;
