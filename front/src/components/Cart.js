import styled from 'styled-components'
import {useEffect} from 'react'
import { useQuery, gql } from "@apollo/client";


const CartDiv = styled.div`
    display: flex;
    flex-direction: column;
`

function Cart({change}){

    useEffect(() => {
        //Refetch
        console.log(change)
    }, [change])

    return (
        <CartDiv>
        </CartDiv>

    )
}

export default Cart;
