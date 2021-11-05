import React from 'react'
import {useEffect, useState, useContext} from 'react'
import {ReactComponent as Arrow} from '../../arrow.svg'
import CartItem from "./CartItem";
import Price from "./Price";
import Container from "./Container";
//Axios service
import {CART_SERVICE} from "../../services";
import axios from "axios";
import cartContext from "../../context/cartContext";
//styles
import '../../styles/Cart.css'


function Cart({change, cartItems, setClicked}){
    const context = useContext(cartContext)

    const [prices, setPrices] = useState({
        subtotal: 0,
        discount: 0,
        total: 0
    })

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

    //Para manejar click del botón de continuar y hacer conditional rendering en App
    const handleOnClick = async () => {
        const {data} = await CART_SERVICE.saveCart({items: cartItems, subtotal: prices.subtotal, discount: prices.discount, total: prices.total})
        if(data) context.id = data.id
        setClicked(true)
    }

    console.log("cart",  cartItems)

//Muestra el carrito actual con los precios de esos productos ya con el descuento calculado
    //Todo: El container sería solo estilos de este componentes o sería separado?
    return (
        <div id="cart">
            <h4>Actualización de Precio</h4>
            <Container show={cartItems && cartItems.length > 0}>
                {cartItems && (cartItems.map(el => <CartItem el={el}/>))}
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
