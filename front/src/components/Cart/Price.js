import React from 'react'
import '../../styles/Price.css'

function Price({children, discount}){

//Muestra el carrito actual con los precios de esos productos ya con el descuento calculado
    return (
        <div id="price" className={discount && "discount"}>
            {children}
        </div>
    )
}

export default Price;
