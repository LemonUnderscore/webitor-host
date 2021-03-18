import React from 'react';
import Dropzone from './DropZone';

export default function Toolbar(props) {

  function saveFile(){
    let found = props.tabList.findIndex(tab => tab.id == props.activeTab);
    let arr = props.tabList;
    let changedFile = arr[found];
    let savedContent = changedFile.fileContent;
    var blob = new Blob([savedContent], {type: "text/plain;charset=utf-8"});
    var FileSaver = require('file-saver');
    FileSaver.saveAs(blob, changedFile.name);
  };

  function setBool(setting) {
      props.changeBoolSetting(setting)
  }

  function setString(e, setting) {
      props.changeStringSetting(e.target.value, setting)
  }

  function setInt(e, setting) {
      props.changeIntSetting(e.target.value, setting)
  }

  return (
    <div className="settingsBar">
      <div className="toolbarWrapper">
        <div className="toolbar">

          <button onClick={ () => saveFile() }>Save File</button>

          <button><Dropzone addTab={props.addTab}/></button>
          
          <div className="menuOption">
            <label for="theme">
            Theme
              <select onChange={(e) => setString(e, "theme")}>
                  <option value="monokai">Monokai</option>
                  <option value="github">Github</option>
                  <option value="twilight">Twilight</option>
                  <option value="tomorrow">Tomorrow</option>
              </select>  
            </label>
                  
          </div>

          <div className="menuOption">
            <label for="Tab Size">
              Tab Size
              <select onChange={(e) => setInt(e, "tabSize")}>
                <option value="2">2</option>
                <option selected value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>  
            </label>
                 
          </div>

          <div className="menuOption">
            <label for="Font Size">
              Font Size
              <select onChange={(e) => setInt(e, "fontSize")}>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option selected value="18">18</option>
                <option value="20">20</option>
              </select>
            </label>
                    
          </div>

          <div className="menuOption">
                <label for="Show Line Numbers">
                  <input onChange={ () => setBool("showLineNumbers") }  type="checkbox" checked={props.settings.showLineNumbers} name="Show Line Numbers"/>
                  Show Line Numbers
                </label>   
          </div>
            
          <div className="menuOption">
              <label for="Show Gutter">
                <input onChange={ () => setBool("showGutter") }  type="checkbox" checked={props.settings.showGutter} name="Show Gutter"/>
                Show Gutter
              </label> 
          </div>

          <div className="menuOption">
              <label for="Show Print Margin">
                <input onChange={ () => setBool("showPrintMargin") } type="checkbox" checked={props.settings.showPrintMargin} name="Show Print Margin"/>
                Show Print Margin
              </label>
          </div>

          <div className="menuOption">
              <label for="Highlight Active Line">
                <input onChange={ () => setBool("highlightActiveLine") } type="checkbox" checked={props.settings.highlightActiveLine} name="Highligh Active Line"/>
                Highlight Active Line
              </label>
          </div>

          <div className="menuOption">
              
              <label for="Basic Auto Complete">
                <input onChange={ () => setBool("basicAutoComplete") }  type="checkbox" checked={props.settings.basicAutoComplete} name="Basic Auto Complete"/>
                Basic Auto Complete
              </label>
          </div>

          <div className="menuOption">
              <label for="Live Auto Complete">
                <input onChange={ () => setBool("liveAutoComplete") }  type="checkbox" checked={props.settings.liveAutoComplete} name="Live Auto Complete"/>
                Live Auto Complete
              </label>
          </div>

          <div className="menuOption">
              <label for="Enable Snippets">
                <input onChange={ () => setBool("enableSnippets") }  type="checkbox" checked={props.settings.enableSnippets} name="Enable Snippets"/>
                Enable Snippets
              </label> 
          </div>

        </div>
      </div>
    </div>
  );
}
