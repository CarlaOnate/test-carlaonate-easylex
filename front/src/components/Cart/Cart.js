import React from 'react'
import {useEffect, useState, useContext} from 'react'
import {ReactComponent as Arrow} from '../../icons/arrow.svg'
import CartItem from "./CartItem";
import Price from "./Price";
import Container from "./Container";
//Axios service
import {CART_SERVICE} from "../../services";
import axios from "axios";
import cartContext from "../../context/cartContext";
//styles
import '../../styles/Cart/Cart.css'

//This component render the cart items selecte and the calculated price of those items
function Cart({change, cartItems, setClicked}){
    const context = useContext(cartContext)

    const [prices, setPrices] = useState({
        subtotal: 0,
        discount: 0,
        total: 0
    })

    //Make req to backend to calculate the price of the current cart
    useEffect(() => {
        const fetchPrices = async () => {
            const {data} = await CART_SERVICE.calculatePrice({items: cartItems})
            data && setPrices({
                    subtotal: data.cart.subtotal,
                    discount: data.cart.discount,
                    total: data.cart.total
            })
        }
        fetchPrices()
        return () => {
            //Cleanup
            const source = axios.CancelToken.source()
            source.cancel()
        }
    }, [change, cartItems])

    //handle continue button click and change render on App.js
    const handleOnClick = async () => {
        setClicked(true)
        const {data} = await CART_SERVICE.saveCart({items: cartItems, subtotal: prices.subtotal, discount: prices.discount, total: prices.total})
        if(data) context.id = data.id
    }


//Shows the cart with the current price
    return (
        <div id="cart">
            <h4>Actualización de Precio</h4>
            <Container show={cartItems && cartItems.length > 0}>
                {cartItems && (cartItems.map(el => <CartItem key={el.item._id} el={el}/>))}
            </Container>
            <Container show={true}>
                <hr />
                <Price><p>Subtotal</p> <p>${prices && prices.subtotal} MXN</p></Price>
                <Price discount={true}><p>Discount</p> <p>- ${prices && prices.discount} MXN</p></Price>
                <Price><p>IVA</p> <p>${prices && (prices.subtotal*0.16).toFixed(2)} MXN</p></Price>
                <hr />
                <Price><p>Total</p> <p>${prices && prices.total} MXN</p></Price>
            </Container>
            <button onClick={handleOnClick}>
                <div>
                    <p>Continuar</p>
                    <Arrow />
                </div>
            </button>
        </div>
    )
}

export default Cart;
