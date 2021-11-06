import React from 'react'
//styles
import '../../styles/Cart/Container.css'

//Container for cartItems inside Cart and Price components inside Cart
function Container({children, show}){
    return (
        <div id="container" className={!show ? "hide" : undefined}>{children}</div>
    )
}

export default Container;
