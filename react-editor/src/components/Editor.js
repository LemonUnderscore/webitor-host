import React, { Component } from 'react'
import AceEditor from "react-ace";
//language modes
import {javascriptMode, pythonMode, htmlMode, cssMode, javaMode, csharpMode} from './index';
//language snippets
import {jsSnippets, pythonSnippets, htmlSnippets, cssSnippets, javaSnippets} from './index';
//editor themes
import {monokaiTheme, githubTheme, twilightTheme, tomorrowTheme} from './index';
//language tools
import "ace-builds/src-min-noconflict/ext-language_tools";

export default function Editor(props) {

    const handleChange = (change) => {
        props.onFileChange(change, props.id);
    }

    const getMode = () => {
        const regex = /(?:\.([^.]+))?$/;
        let extension = regex.exec(props.name)
        switch (extension[0]){
            case ".js":
                return "javascript";
            case ".py":
                return "python";
            case ".html":
                return "html";
            case ".css":
                return "css";
            case ".java":
                return "java";
            case ".cs":
                return "csharp";
            default:
                return null
        }
    }

    return (
        <div className="editorWrapper">
        <AceEditor
            placeholder={`${props.name}`}
            className="AceEditor"
            mode={`${getMode()}`}
            theme={`${props.editorSettings.theme}`}
            name={`editor-${props.id}`}
            fontSize={parseInt(`${props.editorSettings.fontSize}`, 10)}
            showPrintMargin={props.editorSettings.showPrintMargin}
            showGutter={props.editorSettings.showGutter}
            highlightActiveLine={props.editorSettings.highlightActiveLine}
            height={"93vh"}
            width={"100vw"}
            value={props.fileContent}
            onChange={handleChange}
            setOptions={{
            showLineNumbers: props.editorSettings.showLineNumbers,
            enableBasicAutocompletion: props.editorSettings.basicAutoComplete,
            enableLiveAutocompletion: props.editorSettings.liveAutoComplete,
            enableSnippets: props.editorSettings.enableSnippets,
            tabSize: props.editorSettings.tabSize,
        }}/>
    </div>
    )
}
