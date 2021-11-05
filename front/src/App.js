import Menu from "./components/Menu"
import Cart from "./components/Cart"
import styled from 'styled-components'
import cartContext from "./context/cartContext";
import {useContext, useEffect, useState} from "react";
import {CART_SERVICE} from "./services";
import "./styles/App.css"



function App() {
    //boton de continuar
    const [change, setChange] = useState(false);
    const [continueClicked, setContinueClicked] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartRes, setCartRes] = useState()
    const context = useContext(cartContext)
    console.log("APP context", context)

    useEffect(() => {
        const fetchCart = async () => {
            const {data} = await CART_SERVICE.getCart(context.id)
            setCartRes(data.cart)
        }
        fetchCart()
    }, [continueClicked, context.id])

    //Si se picó el botón de continuar se muestra esto
if(continueClicked){
    console.log("App, cart", cartRes)
    return (
        <>
            <h1>Tu selección fue la siguiente:</h1>
            <Cart change={change} setClicked={setContinueClicked} cartItems={cartRes.items}/>
        </>
    )
}

if(!cartItems) return <p>Loading...</p>

//Se muestran los componentes de la aplicación y se les pasan los estados por props
    return (
    <div className="app">
        <h1>Selecciona los contratos que necesitas:</h1>
        <p>Eliges todos los documentos que necesites y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</p>
        <div>
             <Menu setChange={setChange} cartState={{cartItems, setCartItems}}/>
             <Cart change={change} setClicked={setContinueClicked} cartItems={cartItems}/>
        </div>
    </div>
  );
}



export default App;
