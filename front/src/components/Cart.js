import styled from 'styled-components'
import {useEffect, useState} from 'react'
import { useQuery, gql } from "@apollo/client";


const CartDiv = styled.div`
display: flex;
flex-direction: column;
  div {
     flex-direction: column;
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
                    <p>{el.item.qty} {el.item.name} </p>
                    <p>{el.price}</p>
                </div>
            )))}
            <p>Subtotal {cart && cart.subtotal}</p>
            <p>Discount {cart && cart.discount}</p>
            <p>IVA {cart && cart.subtotal*1.16}</p>
            <p>Total{cart && cart.total}</p>
        </CartDiv>

    )
}

export default Cart;
