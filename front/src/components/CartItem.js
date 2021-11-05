import React from 'react'
import '../styles/CartItem.css'

// const CartItem = styled.div`
//     display: flex;
//     width: 100%;
//     flex-direction: row;
//     justify-content: space-between;
//     p {
//         margin: 10px 0px 10px 0px;
//     }
//     p:nth-child(2){
//         flex-grow: 2;
//         margin-left: 4px;
//     }
//     p:last-child {
//         font-weight: bold;
//     }
//     @media screen
//     and (min-device-width : 768px)
//     and (max-device-width : 1281px){
//         p {
//             font-size: 17px;
//         }
//     }
// `


function CartItem({el}){
    return (
        <div id="cartItem" key={el.item._id}>
                <p>{el.qty}</p> <p>{el.item.name} </p>
                <p>${el.item.price} MXN</p>
        </div>
    )
}

export default CartItem;
