import React, { Component } from 'react'
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import Editor from './Editor';
import shortid from 'shortid';
import ToolBar from './ToolBar';
import TabTitle from './TabTitle';

export default class TabBar extends Component {

    state = {
        activeTab: null,
        tabList: [
            {
            id: "defaultID",
            name: "new_file.txt",
            fileContent: ""
            }
        ],
    };

    addTab = (data, name) => {
        let newTab = {
            id: shortid.generate(),
            name: name ? name : "new_file.txt",
            fileContent: data ? data : "",
        }
        this.setState({
            tabList: [...this.state.tabList, newTab],
        })
    };

    closeTab = (deleteID) => {
        let found = this.state.tabList.findIndex(tab => tab.id == deleteID);
        let next;
        found == 0 ? next = this.state.tabList[found + 1] : next = this.state.tabList[found - 1];
        let filteredList = this.state.tabList.filter(tab => tab.id !== deleteID);
        this.setState({
            activeTab: next ? next.id : null,
            tabList: filteredList,
        })
    };

    handleFileChange = (fileData, fileID) => {
        let found = this.state.tabList.findIndex(tab => tab.id == fileID);
        let arr = this.state.tabList;
        let changedFile = arr[found];
        changedFile.fileContent = fileData;
        this.setState({
            tabList: [...this.state.tabList]
        })
    }

    changeName = (name, fileID) => {
        let found = this.state.tabList.findIndex(tab => tab.id == fileID);
        let arr = this.state.tabList;
        let changedFile = arr[found];
        changedFile.name = name;
        this.setState({
            tabList: [...this.state.tabList]
        })
    }

    render() {
        return (
            <div>
                <ToolBar
                tabList={this.state.tabList}
                activeTab={this.state.activeTab}
                settings={this.props.editorSettings}
                addTab={this.addTab}
                changeStringSetting={this.props.changeStringSetting}
                changeBoolSetting={this.props.changeBoolSetting}
                changeIntSetting={this.props.changeIntSetting}
                />
                <div className="tabBarWrapper">
                    <Tabs
                    className="tabsContainer"
                    defaultTab={this.state.activeTab}
                    onChange={ (tabId) => { this.setState({activeTab: tabId}) }
                    }>
                        <TabList className="tabBar">
                            { this.state.tabList.map((tab, index) =>
                            <Tab
                            className={`tab ${this.state.activeTab == tab.id ? "activeTab" : ""}`}
                            key={tab.id}
                            tabFor={ tab.id.toString() }
                            >
                                <div>
                                    <TabTitle
                                    changeName={this.changeName}
                                    name={tab.name}
                                    id={tab.id}
                                    />
                                    {
                                        this.state.tabList.length > 1 ?
                                        <button id="closeButton"onClick={ () => this.closeTab(tab.id, index) }>X</button> :
                                        null
                                    }
                                    
                                </div>
                            </Tab> 
                            )}
                            <button
                            onClick={() => this.addTab()}
                            id="tabButton"
                            >
                                +
                            </button>
                        </TabList>
                        { this.state.tabList.map((tab) =>         
                            <TabPanel key={tab.id} tabId={tab.id.toString()}>
                                <Editor
                                editorSettings={this.props.editorSettings}
                                fileContent={tab.fileContent}
                                onFileChange={this.handleFileChange}
                                id={tab.id}
                                name={tab.name}
                                />
                            </TabPanel>
                        )}
                    </Tabs>
                </div>  
            </div>
        )
    }
}