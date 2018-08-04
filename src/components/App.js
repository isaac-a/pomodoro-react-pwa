import React, { Component } from 'react';
import 'material-icons';

import Menu from './Menu';
import Timer from './Timer';

const bell = new Audio(
  'https://www.freesound.org/data/previews/22/22627_7037-lq.mp3'
);

class App extends Component {
  state = {
    title: 'Session',
    sessionLength: 25,
    breakLength: 5,
    play: false,
    counter: 0,
    settings: {
      sessionLength: 25,
      breakLength: 5,
      menu: false
    }
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyboardEvents);
    const color = JSON.parse(localStorage.getItem('pomodoro-color'));
    const background = JSON.parse(
      localStorage.getItem('pomodoro-background')
    );
    document.documentElement.style.setProperty('--primary', background);
    document.documentElement.style.setProperty('--secondary', color);
  };

  keyboardEvents = e => {
    const { menu } = this.state.settings;
    if (e.which === 32) {
      this.btnAction();
    } else if (e.which === 13) {
      if (menu) this.reset();
    } else if (e.which === 82) {
      this.toggleMenu(true);
      this.reset();
      this.toggleMenu(false);
    } else if (e.which === 77) {
      this.toggleMenu(true);
    } else if (menu && e.which === 27) {
      this.toggleMenu(false);
    }
  };

  elapseTime = () => {
    let newState;
    const { title, sessionLength, breakLength, counter } = this.state;
    if (title === 'Session') {
      if (sessionLength < 0.017) {
        bell.play();
        this.setState({ title: 'Break', counter: counter + 1 });
      } else {
        newState = sessionLength - 1 / 60;
        this.setState({ sessionLength: newState });
      }
    } else if (breakLength < 0.017) {
      bell.play();
      this.setState({
        title: 'Session',
        sessionLength: this.state.settings.sessionLength,
        breakLength: this.state.settings.breakLength
      });
    } else {
      newState = breakLength - 1 / 60;
      this.setState({ breakLength: newState });
    }
  };

  timer = null;

  btnAction = () => {
    if (!this.state.play) {
      this.setState({ play: true });
      this.timer = setInterval(this.elapseTime, 1000);
    } else {
      this.setState({ play: false });
      clearInterval(this.timer);
    }
  };

  toggleMenu = bool => {
    this.setState(prevState => ({
      settings: { ...prevState.settings, menu: bool }
    }));
  };

  reset = () => {
    clearInterval(this.timer);
    const sessionValue = parseInt(
      document.getElementById('session').value,
      10
    );
    const breakValue = parseInt(
      document.getElementById('break').value,
      10
    );
    this.setState({
      play: false,
      title: 'Session',
      sessionLength: sessionValue,
      breakLength: breakValue,
      counter: 0,
      settings: {
        sessionLength: sessionValue,
        breakLength: breakValue,
        menu: false
      }
    });
  };

  render() {
    return (
      <div className="container">
        <button className="menu-btn" onClick={() => this.toggleMenu(true)}>
          <i className="material-icons">more_vert</i>
        </button>
        {this.state.settings.menu && (
          <Menu
            sessionLength={this.state.settings.sessionLength}
            breakLength={this.state.settings.breakLength}
            reset={this.reset}
            toggleMenu={this.toggleMenu}
            counter={this.state.counter}
          />
        )}
        <h2>{this.state.title}</h2>
        <Timer
          title={this.state.title}
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
        />
        <button className="action-btn" onClick={this.btnAction}>
          <i className="material-icons">
            {this.state.play ? 'pause' : 'play_arrow'}
          </i>
        </button>
      </div>
    );
  }
}

export default App;
