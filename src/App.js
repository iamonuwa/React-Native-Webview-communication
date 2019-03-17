import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./Button";
const MESSAGE_PREFIX = "SENT_FROM_WEBSITE";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }
  componentDidMount() {
    if (document) {
      document.addEventListener("message", this.handleMessage);
      alert("using document");
    } else if (window) {
      window.addEventListener("message", this.handleMessage);
      alert("using window");
    } else {
      alert("unable to add event listener");
      return;
    }
    this.eventListenersAdded = true;
  }

  componentWillMount() {
    if (document) {
      document.removeEventListener("message", this.handleMessage);
    } else if (window) {
      window.removeEventListener("message", this.handleMessage);
    }
  }

  componentDidUpdate(prevProps, prevState) {}
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
      messageData = JSON.parse(event.nativeEvent.data);
      if (
        messageData.hasOwnProperty("prefix") &&
        messageData.prefix === MESSAGE_PREFIX
      ) {
        console.log(`Website received message: ${messageData.payload}`);
        this.setState({ message: messageData.payload });
      }
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
            {this.state.message ? this.state.message : "Learn React"}
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
