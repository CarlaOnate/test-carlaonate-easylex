import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useEffect, useState} from "react";

const AppDiv = styled.div`
    @media screen 
    and (min-device-width : 375px) 
    and (max-device-width : 667px){
      font-size: 15px;
    }
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: space-around;  
    h1 {
       margin: 20px 10px 0px 10px;
       font-size: 15px; 
    }
    p {
        margin: 2px 10px 20px 10px;
    }
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
        <h1>Selecciona los contratos que necesitas:</h1>
        <p>Eliges todos los documentos que necesites y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</p>
     <Menu setChange={setChange} cartID={cart}/>
     <Cart change={change} cartID={cart}/>
    </AppDiv>
  );
}



export default App;
