import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Menu extends Component {
  state = {
    color: JSON.parse(localStorage.getItem('pomodoro-color')) || '#f44336',
    background:
      JSON.parse(localStorage.getItem('pomodoro-background')) || '#212121'
  };

  handleColor = async e => {
    await this.setState({ [e.target.name]: [e.target.value][0] });
    document.documentElement.style.setProperty(
      '--primary',
      this.state.background
    );
    document.documentElement.style.setProperty(
      '--secondary',
      this.state.color
    );
    localStorage.setItem(
      'pomodoro-color',
      JSON.stringify(this.state.color)
    );
    localStorage.setItem(
      'pomodoro-background',
      JSON.stringify(this.state.background)
    );
  };

  render() {
    return (
      <div className="menu-wrapper">
        <div
          role="button"
          tabIndex={0}
          className="overlay"
          onClick={() => this.props.toggleMenu(false)}
        />
        <ReactCSSTransitionGroup
          transitionName="menu"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="menu-box">
            <div className="menu-content">
              <div>
                <span>Number of Sessions: {this.props.counter}</span>
              </div>
              <div>
                <span>Session Length: </span>
                <input
                  id="session"
                  type="text"
                  defaultValue={this.props.sessionLength}
                />
              </div>
              <div>
                <span>Break Length: </span>
                <input
                  id="break"
                  type="text"
                  defaultValue={this.props.breakLength}
                />
              </div>
              <div>
                <span>Background: </span>
                <input
                  type="color"
                  name="background"
                  onChange={e => this.handleColor(e)}
                  defaultValue={this.state.background}
                />
              </div>
              <div>
                <span>Text: </span>
                <input
                  type="color"
                  name="color"
                  onChange={e => this.handleColor(e)}
                  defaultValue={this.state.color}
                />
              </div>
              <div>
                <button onClick={() => this.props.reset()}>Reset</button>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Menu.propTypes = {
  sessionLength: PropTypes.number.isRequired,
  breakLength: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default Menu;
