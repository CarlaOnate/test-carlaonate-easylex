import styled from 'styled-components'
import {useEffect, useState} from 'react'
import { useQuery, gql } from "@apollo/client";


const CartDiv = styled.div`
    display: flex;
    margin: 10px;
    flex-grow: 2;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EEFFFC;
    border-radius: 10px;
    h4 {
        width:85%;
        color: #1A2871;
    }
    hr {
        opacity: 50%;
        border: 1px solid #A6AAB8;
        width: 85%;
    }
`

const CartItem = styled.div`
    display: flex;
    width: 85%;
    flex-direction: row;
    justify-content: space-between;
    p:nth-child(2){
        flex-grow: 2;
        margin-left: 4px;
    }
    p:last-child {
        font-weight: bold;
    }
    
`

const Price = styled.div`
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    p:last-child {
        font-weight: bold;
    }
    ${props => props.discount && "color: #1A2871" }
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


function Cart({change, cartID}){
    console.log("cartID", cartID)
    // const { loading, error, data, refetch } = useQuery(GETCART, {variables: {cart: cartID}})
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



    console.log("data", data)
    console.log("cart", cart)
    if(loading) return <p>Loading...</p>
    if(error) return <p>sth went wrong</p>

    return (
        <CartDiv>
            <h4>Actualización de Precio</h4>
            {cart && (cart.items.map(el => (
                <CartItem>
                    <p>{el.qty}</p> <p>{el.item.name} </p>
                    <p>${el.item.price} MXN</p>
                </CartItem>
            )))}
            <hr />
            <Price><p>Subtotal</p> <p>${cart && cart.subtotal} MXN</p></Price>
            <Price discount={true}><p>Discount</p> <p>- ${cart && cart.discount} MXN</p></Price>
            <Price><p>IVA</p> <p>${cart && (cart.subtotal*0.16).toFixed(2)} MXN</p></Price>
            <hr />
            <Price><p>Total</p> <p>${cart && cart.total} MXN</p></Price>
        </CartDiv>

    )
}

export default Cart;
