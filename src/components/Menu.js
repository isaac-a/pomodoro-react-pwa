import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({
  sessionLength,
  breakLength,
  reset,
  toggleMenu,
  counter
}) => (
  <div className="menu-wrapper">
    <div
      role="button"
      tabIndex={0}
      className="overlay"
      onClick={() => toggleMenu(false)}
    />
    <div className="menu-box">
      <div className="menu-content">
        <div>
          <span>Session Length: </span>
          <input id="session" type="text" defaultValue={sessionLength} />
        </div>
        <div>
          <span>Break Length: </span>
          <input id="break" type="text" defaultValue={breakLength} />
        </div>
        <div>
          <span>Number of Sessions: {counter}</span>
        </div>
        <div>
          <button onClick={() => reset()}>Reset</button>
        </div>
      </div>
    </div>
  </div>
);

Menu.propTypes = {
  sessionLength: PropTypes.number.isRequired,
  breakLength: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default Menu;
