import React from 'react'
import '../../styles/Option.css'


function Option({el, cartItems, findQty, handleAdd, handleDel}){

    return (
        <div id="option" key={el._id} className={cartItems.length > 0 && findQty(el.type) > 0 && "selected"}>
            <button id={el.type} onClick={handleDel}>-</button>
            <p>{cartItems.length > 0 ? findQty(el.type) : 0}</p>
            <button id={el.type} onClick={handleAdd}>+</button>
            <p>{el.name}</p>
        </div>
    )
}

export default Option;
