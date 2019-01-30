import React, { Component } from "react";
import { connect } from "react-redux";
import { Harmonizer } from "color-harmony";

import "./App.css";

import {
  requestSending,
  requestSuccess,
  requestError,
  getForecastForZipcode
} from "./state/weatherReducer";

import { getForecastForZipcodeRequest } from "./requests";

const harmonizer = new Harmonizer();

class App extends Component {
  rainbow = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FF7F00", "#FF0000"];
  state = {
    currentZip: null,
    backgroundColor: this.rainbow[
      Math.floor(Math.random() * this.rainbow.length)
    ]
  };

  componentDidUpdate = (_, prevState) => {
    const { currentZip } = this.state;
    if (prevState.currentZip !== currentZip) {
      this.getForecast(currentZip);
    }
  };

  getForecast = async zipCode => {
    // thunkful way
    // await this.props.getForecastForZipcode(zipCode);
    // this.setState({ backgroundColor: this.getColor() });

    // thunkless way
    try {
      this.props.requestSending();

      const result = await getForecastForZipcodeRequest(zipCode);

      this.props.requestSuccess(result);

      this.setState({ backgroundColor: this.getColor() });

      return result;
    } catch (err) {
      this.props.requestError(err);
    }
  };

  handleUpdateZip = currentZip => {
    if (currentZip.length === 5) {
      this.setState({
        currentZip
      });
    }
  };

  getColor = () => {
    const index = Math.floor(this.rainbow.length * Math.random());
    return harmonizer.tints(this.rainbow[index], 5)[4];
  };

  render() {
    const { forecast, status } = this.props;
    const { backgroundColor } = this.state;

    const showSpinner = () => (
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </svg>
    );

    const renderForecast = data => {
      const { city, list } = data;
      const { temp: kelvinTemp } = list[0].main;

      const celsiusTemp = kelvinTemp - 273;
      const fTemp = Math.floor(celsiusTemp * (9 / 5) + 32);

      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>{fTemp}°F</div>
          <div style={{ color: "darkGrey" }}>{city.name}</div>
        </div>
      );
    };
    const renderError = () => {
      return "Nope :(";
    };

    return (
      <div className="App" style={{ backgroundColor }}>
        <div className="Content">
          {status === "sending" && showSpinner()}
          {status === "success" && renderForecast(forecast)}
          {status === "error" && renderError()}
        </div>
        <input
          placeholder="Enter a zipcode"
          onChange={e => this.handleUpdateZip(e.target.value)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.weatherState
});

// const mapDispatchToProps = dispatch => ({
//   requestSending: () => dispatch(requestSending()),
//   requestSuccess: forecast => dispatch(requestSuccess(forecast)),
//   requestError: err => dispatch(requestError(err))
// });

const mapDispatchToProps = {
  requestSending,
  requestSuccess,
  requestError,
  getForecastForZipcode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
