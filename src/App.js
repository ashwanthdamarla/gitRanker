/* global chrome */

import React, { Component } from "react";
import GitRanker from './GitRanker.js';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    var profile = url.searchParams.get("profile");
    this.state = {
      id: id,
      profile: profile
    }
  }

  render() {
    return (
      <div
        className="App"
        style={{
          width: "400px",
        }}
      >
        <GitRanker id={this.state.id} profile={this.state.profile}/>
      </div>
    );
  }
}

export default App;
