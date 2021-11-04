import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useState} from "react";
import "./styles/App.css"



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
    <div className="app">
        <h1>Selecciona los contratos que necesitas:</h1>
        <p>Eliges todos los documentos que necesites y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</p>
        <div>
             <Menu setChange={setChange} cartState={{cart, setCart}}/>
             <Cart change={change} cartState={{cart, setCart}} saveCart={{saveCart, saveCartRes}}/>
        </div>
    </div>
  );
}



export default App;
