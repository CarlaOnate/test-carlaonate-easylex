import React from 'react'
import '../../styles/Cart/CartItem.css'

//Cart item rendered inside Cart
function CartItem({el}){
    return (
        <div id="cartItem" key={el.item._id}>
                <p>{el.qty}</p> <p>{el.item.name} </p>
                <p>${el.item.price} MXN</p>
        </div>
    )
}

export default CartItem;
