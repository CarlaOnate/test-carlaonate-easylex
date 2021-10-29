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
    // const [cart, setCart] = useState()

    useEffect(() => {
        const newCart = async () => {
            await createCart()
        }
        newCart()
    }, [])

    if(loading) return <p>Loading...</p>
    if(error) return <p>Sth went wrong</p>

    return (
    <div>
     <Menu setChange={setChange} cart={data}/>
     <Cart change={change}/>
    </div>
  );
}



export default App;
