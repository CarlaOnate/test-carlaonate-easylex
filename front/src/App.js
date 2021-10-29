import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useEffect, useState} from "react";

const CREATE_CART = gql`
    mutation createCart{
        createCart
    }
`


function App() {
    //Hook to use mutation
    const [createCart, {data, loading, error}] = useMutation(CREATE_CART);
    const [change, setChange] = useState(false);
    const [cartId, setCartId] = useState()

    useEffect(() => {
        const newCart = async () => {
            await createCart()
        }
        newCart()
        !loading && setCartId(data.createCart)
    }, [])

    return (
    <div>
     <Menu changeState={setChange} cart={cartId}/>
     <Cart change={change}/>
    </div>
  );
}



export default App;
