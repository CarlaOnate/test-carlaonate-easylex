import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useState} from "react";

//Estos son los estilos de este componente
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
    and (max-device-width : 1281px){
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

//Se define la mutación para guardar el carrito en la DB
//Esto se llama aquí porque se hace conditional rendering dependiendo del resultado de esta mutation
const SAVECART = gql`
    mutation saveCart($cart: CartInput){
        saveCart(cart: $cart){
            id
            total
            subtotal
            discount
            items {
                item {
                    id
                    name
                    price
                    type
                }
                qty
            }
        }
    }
`

function App() {
    const [saveCart, saveCartRes] = useMutation(SAVECART);
// Estados para manejar cambio en carrito y guardar los cambios que se hagan al mismo
    const [change, setChange] = useState(false);
    const [cart, setCart] = useState({
        id: "",
        items: [],
        total: 0,
        subtotal: 0,
        discount: 0
    })

    //Si se ha guardado el carrito en la base de datos mostrar solo el componente Cart
    if(saveCartRes.data){
        return(
        <>
            <h1>Tu selección final es la siguiente</h1>
            <Cart change={change} cartState={{cart, setCart}} saveCart={{saveCart, saveCartRes}}/>
        </>)
    }

    //Se llaman los dos componentes de la app y se les pasan los datos por props
    return (
    <AppDiv>
        <h1>Selecciona los contratos que necesitas:</h1>
        <p>Eliges todos los documentos que necesites y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</p>
        <div>
             <Menu setChange={setChange} cartState={{cart, setCart}}/>
             <Cart change={change} cartState={{cart, setCart}} saveCart={{saveCart, saveCartRes}}/>
        </div>
    </AppDiv>
  );
}



export default App;
