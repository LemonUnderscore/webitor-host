import './App.css';
import TabBar from './components/TabBar';
import React, { Component } from 'react';

export default class App extends Component {

  state = {
    settings: {
      showLineNumbers: true,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      basicAutoComplete: true, 
      liveAutoComplete: true, 
      enableSnippets: true,
      fontSize: 18,
      tabSize: 4,
      theme: "monokai",
    }
  }
 
  changeBoolSetting = (setting) => {
    this.setState({
      settings: {
        [setting]: !this.state.settings[setting],
      }
    });
  }

  changeStringSetting = (s, setting) => {
    this.setState({
      settings: {
        [setting]: s,
      }
    });
  }

  changeIntSetting = (n, setting) => {
    let value = parseInt(n, 10);
    this.setState({
      settings: {
        [setting]: value,
      }
    })
  }

  render() {
    return (
      <div className="App">
        <TabBar
        editorSettings={this.state.settings}
        changeStringSetting={this.changeStringSetting}
        changeBoolSetting={this.changeBoolSetting}
        changeIntSetting={this.changeIntSetting}
        />
      </div>
    )
  }
}