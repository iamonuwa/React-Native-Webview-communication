import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Button";

const MESSAGE_PREFIX = "SENT_FROM_WEBSITE";
class App extends Component {
  componentDidMount() {}
  onButtonEvent = (event, payload) => {
    this.sendMessage({
      event,
      payload
    });
  };

  sendMessage = payload => {
    const message = JSON.stringify({
      prefix: MESSAGE_PREFIX,
      payload: payload
    });

    if (document.hasOwnProperty("postMessage")) {
      document.postMessage(message, "*");
    } else if (window.hasOwnProperty("postMessage")) {
      window.postMessage(message, "*");
    } else {
      throw new Error("Unable to find postMessage");
    }
  };

  handleMessage = event => {
    let messageData;
    try {
    } catch (error) {
      console.warn(error);
      return;
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button
            onClick={event => {
              this.onButtonEvent("onButtonClicked", {
                message: "OPEN_QR_READER"
              });
            }}
            text="Click Me!"
          />
        </header>
      </div>
    );
  }
}

export default App;
