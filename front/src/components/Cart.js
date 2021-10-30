import styled from 'styled-components'
import {useEffect, useState} from 'react'
import { useQuery, gql } from "@apollo/client";


const CartDiv = styled.div`
display: flex;
  div {
     flex-direction: row;
     justify-content: space-between;
  }
`

const GETCART = gql`
    query GETCART($cartId: ID){
        getCart(cartId: $cartId){
            items {
                item {
                    name
                    type
                    price
                }
                qty
            }
            discount
            subtotal
            total
        }
    }
`


function Cart({change, cart: cartID}){
    const { loading, error, data, refetch } = useQuery(GETCART, {variables: {cart: cartID}})
    const [cart, setCaret] = useState()

    useEffect(() => {
        //Refetch
        refetch().then().catch()
    }, [change])



    return (
        <CartDiv>
            <h4>Actualización de Precio</h4>
            {/*{cart && cart.items.map(el => (*/}
            {/*    <div>*/}
            {/*        <p>{el.qty} {el.name} </p>*/}
            {/*        <p>{el.price}</p>*/}
            {/*    </div>*/}
            {/*))}*/}
        </CartDiv>

    )
}

export default Cart;
