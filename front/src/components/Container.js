import React from 'react'
//styles
import '../styles/Container.css'


function Container({children, show}){
    return (
        <div id="container" className={!show ? "hide" : "show"}>{children}</div>
    )
}

export default Container;
