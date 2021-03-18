import React, {useState} from 'react';
import {SiJavascript, SiPython, SiJava, SiHtml5, SiCss3, SiCsharp, BsTextLeft} from './index';

export default function TabTitle(props) {
    const [toggle, setToggle] = useState(false);

    function setName(name) {
        props.changeName(name, props.id)
    }

    const getIcon = () => {
        const regex = /(?:\.([^.]+))?$/;
        let extension = regex.exec(props.name)
        switch (extension[0]){
            case ".js":
                return <SiJavascript/>;
            case ".py":
                return <SiPython/>;
            case ".html":
                return <SiHtml5/>;
            case ".css":
                return <SiCss3/>;
            case ".java":
                return <SiJava/>;
            case ".cs":
                return <SiCsharp/>;
            default:
                return <BsTextLeft/>;
        }
    }

    return (
        <div className="tabTitle">
            {getIcon()}
            { toggle ? (
                <p onDoubleClick={ () => {setToggle(false)} } >
                    {props.name}
                </p>
            ):(
                <input
                autoFocus
                placeholder={props.name}
                type="text"
                name="Rename Tab"
                id="renameTabInput"
                onBlur={ () => { setToggle(true) } }
                onChange={ (event) => { setName(event.target.value) } }
                onKeyDown={ (event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                      setToggle(true)
                      event.preventDefault()
                      event.stopPropagation()
                    }
                }}/>
            )}
        </div>
    )
}
