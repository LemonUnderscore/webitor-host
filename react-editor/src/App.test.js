import { render, screen } from '@testing-library/react';
import {shallow} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ToolBar from './components/ToolBar';
import TabBar from './components/TabBar';
import TabTitle from './components/TabTitle';
import Editor from './components/Editor';

// Create mock settings for component props
const mockSettings = {
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

const mockTab = {
  id: "abc123",
  name: "test_file.js",
  fileContent: "this is a test file"
}

// Test render the entire application
it("full application renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

//Test fuctions in App Component do not throw errors with typical arguments
it("App Component functions pass", () => {
  const wrapper = shallow(<App />)
  expect((error) => wrapper.instance().changeBoolSetting("showLineNumbers").not.toThrow(error))
  expect((error) => wrapper.instance().changeStringSetting("github", "theme").not.toThrow(error))
  expect((error) => wrapper.instance().changeIntSetting("12", "fontSize").not.toThrow(error))
});

// Test render the ToolBar with mock props
it("ToolBar renders with mock props", () => {
  render(<ToolBar settings={mockSettings} />);
});

// Test render the TabBar with mock props
it("TabBar renders with mock props", () => {
  render(<TabBar editorSettings={mockSettings}/>);
});

// Test tab creation and deletion
it("Test tab creation and deletion", () => {
  const wrapper = shallow(<TabBar editorSettings={mockSettings}/>);
  expect((error) => wrapper.instance().addTab().not.toThrow(error));
  expect((error) => wrapper.instance().closeTab("defaultID").not.toThrow(error));
});

// Test render the TabTitle with mock props
it("TabTitle renders with mock props, expect file rename prompt", () => {
  render(<TabTitle name={mockTab.name} id={mockTab.id}/>);
  // Expect the TabTitle to autofocus an text input element upon render
  screen.getByRole("textbox");
});

// Test render the Editor with mock props
it("Editor renders with mock props", () => {
  render(<Editor editorSettings={mockSettings} name={mockTab.name} id={mockTab.id}/>);
});