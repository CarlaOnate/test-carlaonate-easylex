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

`

const CartItem = styled.div`
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    
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
            <CartItem><p>Subtotal</p> <p>${cart && cart.subtotal} MXN</p></CartItem>
            <CartItem><p>Discount</p> <p>${cart && cart.discount} MXN</p></CartItem>
            <CartItem><p>IVA</p> <p>- ${cart && (cart.subtotal*0.16).toFixed(2)} MXN</p></CartItem>
            <CartItem><p>Total</p> <p>${cart && cart.total} MXN</p></CartItem>
        </CartDiv>

    )
}

export default Cart;
