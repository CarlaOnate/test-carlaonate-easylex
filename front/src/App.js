import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useEffect, useState} from "react";

const AppDiv = styled.div`
    display: flex;
    height: 100v;
    flex-direction: column;
    
`


const CREATE_CART = gql`
    mutation createCart{
        createCart
    }
`


function App() {
    //Hook to use mutation
    const [createCart, {data, loading, error}] = useMutation(CREATE_CART);
    const [change, setChange] = useState(false);
    const [cart, setCart] = useState()

    useEffect(() => {
        const newCart = async () => {
            await createCart()
        }
        newCart()
    }, [createCart])

    useEffect(() => {
        if(data){
            setCart(data.createCart)
        }
    }, [data])


if(!cart) return <p>Loading...</p>


    return (
    <AppDiv>
     <Menu setChange={setChange} cartID={cart}/>
     <Cart change={change} cartID={cart}/>
    </AppDiv>
  );
}



export default App;
