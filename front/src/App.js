import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useEffect, useState} from "react";

const AppDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    gap: 10px;
    h1 {
       margin: 5% 10px 0px 10px;
       font-size: 15px; 
       color: #302f2f;
    }
    p {
        margin: 2px 10px 20px 10px;
    }
    &>div{
        display: flex;
        flex-direction: column;
        flex-grow: 2;
    }
    @media screen 
    and (min-device-width : 375px) 
    and (max-device-width : 768px){
      font-size: 15px;
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px){
        h1 {
            margin-top: 5vh; 
            font-size: 25px;            
        }
        &>div {
            gap: 15px;
            margin: 2%;
            flex-direction: row;
            align-items: flex-start;  
        } 
        p {
            font-size: .9rem;
        }
    }
    @media screen 
    and (min-device-width : 1024px) 
    and (max-device-width : 1500px){
        align-items: center;
        h1 {
            width: 80%;
            margin-top: 5vh; 
            font-size: 25px;            
        }
        &>div {
            gap: 5%;
            margin: 5%;
            width: 80%;
            flex-direction: row;
            align-items: flex-start;  
        } 
        &>p {
            width: 80%;
            font-size: .9rem;
        }
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
        <div>
             <Menu setChange={setChange} cartID={cart}/>
             <Cart change={change} cartID={cart}/>
        </div>
    </AppDiv>
  );
}



export default App;
