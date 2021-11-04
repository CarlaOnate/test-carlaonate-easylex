import styled from 'styled-components'
import {useEffect, useState, useContext} from 'react'
import {ReactComponent as Arrow} from '../arrow.svg'
//Axios service
import {CART_SERVICE} from "../services";
import axios from "axios";
import cartContext from "../context/cartContext";

//Estilos del componente
const CartDiv = styled.div`
    display: flex;
    margin: 5px;
    padding-bottom: 30px;
    flex-grow: 2;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #EEFFFC;
    border-radius: 15px;
    h4 {
        margin-top: 30px;
        width:85%;
        color: #1A2871;
    }
    button {
        height: 50px;
        width: 150px;
        border-radius: 10px 0px 0px 10px;
        padding: 10px;
        margin-top: 20px;
        border: none;
        background-color: #4EC9C5;
        color: white;
        align-self: flex-end;
    }
    button>div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            margin: 0;
        }
        svg {
            height: 22px;
        }
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1500px){
        height: 100%;
        flex-grow: 1;
        height: 100%;
        justify-content: flex-start;
        padding-bottom: 0;
        button {
            height: 60px;
            width: 150px;
            margin: 40px 0px 20px 0px;
        }
        h4 {
            font-size: 17px;
        }
    }
`

const CartItem = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    p {
        margin: 10px 0px 10px 0px;
    }
    p:nth-child(2){
        flex-grow: 2;
        margin-left: 4px;
    }
    p:last-child {
        font-weight: bold;
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        p {
            font-size: 17px;
        }
    }
`
//Se usa props para mostrar el componente discount con azul
const Price = styled.div`    
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    p {
        margin: 10px 0px 10px 0px;
    }
    p:last-child {
        font-weight: bold;
    }
    ${props => props.discount && "color: #1A2871;"}
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        p {
            font-size: 17px;
        }
    }
`

//Se usa props para no mostrar el div de elementos en el carrito y el carrito esta vacío.
const Container = styled.div`
    width: 85%;
    hr {
        opacity: 50%;
        border: 1px solid #A6AAB8;
        width: 100%;
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        ${props => !props.show && "display: none"}
    }
`


function Cart({change, cartItems, setClicked}){
    const context = useContext(cartContext)
    console.log("context", context)


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

    console.log("cartItems",  cartItems)
//Muestra el carrito actual con los precios de esos productos ya con el descuento calculado
    return (
        <CartDiv>
            <h4>Actualización de Precio</h4>
            <Container show={cartItems && cartItems.length > 0}>
            {cartItems && (cartItems.map(el => (
                <CartItem key={el.item._id}>
                    <p>{el.qty}</p> <p>{el.item.name} </p>
                    <p>${el.item.price} MXN</p>
                </CartItem>
            )))}
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
        </CartDiv>

    )
}

export default Cart;
