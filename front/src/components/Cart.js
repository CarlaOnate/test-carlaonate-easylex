import styled from 'styled-components'
import {useEffect, useState} from 'react'
import { useQuery, gql } from "@apollo/client";


const CartDiv = styled.div`
display: flex;
flex-direction: column;
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
                <div>
                    <p>{el.qty} {el.item.name} </p>
                    <p>{el.item.price}</p>
                </div>
            )))}
            <p>Subtotal {cart && cart.subtotal}</p>
            <p>Discount {cart && cart.discount}</p>
            <p>IVA {cart && (cart.subtotal*0.16).toFixed(2)}</p>
            <p>Total{cart && cart.total}</p>
        </CartDiv>

    )
}

export default Cart;
