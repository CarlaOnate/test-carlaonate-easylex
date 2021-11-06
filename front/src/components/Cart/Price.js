import React from 'react'
import '../../styles/Cart/Price.css'

//Price component with defined sytles
function Price({children, discount}){

    return (
        <div id="price" className={discount ?  "discount" : undefined}>
            {children}
        </div>
    )
}

export default Price;
