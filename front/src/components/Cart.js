import styled from 'styled-components'
import {useEffect, useState} from 'react'
import { useQuery, gql } from "@apollo/client";
import {ReactComponent as Arrow} from '../arrow.svg'


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
    and (max-device-width : 1281px){
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
        ${props => !props.display && "display: none"}
    }
`


const GETCART = gql`
    query getCart($cartId: ID){
        getCart(cartId: $cartId){
            items {
                item {
                    name
                    type
                    price
                }
                qty
            }
            subtotal
            discount
            total
        }
    }
`


function Cart({change, cartID, setClicked}){
    const { loading, error, data, refetch } = useQuery(GETCART, {variables: {cartId: cartID}})


    const [cart, setCart] = useState()

    useEffect(() => {
        //Refetch
        const refetchCart = async () => {
            await refetch()
        }
        refetchCart().then().catch()
    }, [change, refetch])

    useEffect(() => {
        data && setCart(data.getCart)
    }, [data])


    const handleOnClick = () => {
        setClicked(true)
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>sth went wrong</p>

    return (
        <CartDiv>
            <h4>Actualización de Precio</h4>
            <Container display={cart && cart.items.length > 0}>
            {cart && (cart.items.map(el => (
                <CartItem>
                    <p>{el.qty}</p> <p>{el.item.name} </p>
                    <p>${el.item.price} MXN</p>
                </CartItem>
            )))}
            </Container>
            <Container display={true}>
                <hr />
                <Price><p>Subtotal</p> <p>${cart && cart.subtotal} MXN</p></Price>
                <Price discount={true}><p>Discount</p> <p>- ${cart && cart.discount} MXN</p></Price>
                <Price><p>IVA</p> <p>${cart && (cart.subtotal*0.16).toFixed(2)} MXN</p></Price>
                <hr />
                <Price><p>Total</p> <p>${cart && cart.total} MXN</p></Price>
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
