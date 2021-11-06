import Menu from "./Menu/Menu"
import Cart from "./Cart/Cart"
import cartContext from "../context/cartContext";
import {useContext, useEffect, useState} from "react";
import {CART_SERVICE} from "../services";
import "../styles/App.css"
import axios from "axios";

//
function App() {
    //botón de continuar
    const [change, setChange] = useState(false);
    const [continueClicked, setContinueClicked] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartRes, setCartRes] = useState()
    const context = useContext(cartContext)

    useEffect(() => {
        const fetchCart = async () => {
            const {data} = await CART_SERVICE.getCart(context.id)
            setCartRes(data.cart)
        }
        fetchCart()
        return () => {
            //Cleanup
            const source = axios.CancelToken.source()
            source.cancel()
        }
    }, [continueClicked, context.id])

    //If continue button is clicked then render this
if(continueClicked){
    console.log("App, cart", cartRes)
    return (
        <>
            <h1>Tu selección fue la siguiente:</h1>
            <Cart change={change} setClicked={setContinueClicked} cartItems={cartItems}/>
        </>
    )
}


//The two main components are rendered here: Menu and Cart
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
