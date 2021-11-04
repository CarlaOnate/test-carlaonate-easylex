import Menu from "./components/Menu"
import Cart from "./components/Cart"
import styled from 'styled-components'
import cartContext from "./context/cartContext";
import {useContext, useEffect, useState} from "react";
import {CART_SERVICE} from "./services";



//Esto son los estilos del componente principal de la app
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
    <AppDiv>
        <h1>Selecciona los contratos que necesitas:</h1>
        <p>Eliges todos los documentos que necesites y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</p>
        <div>
             <Menu setChange={setChange} cartState={{cartItems, setCartItems}}/>
             <Cart change={change} setClicked={setContinueClicked} cartItems={cartItems}/>
        </div>
    </AppDiv>
  );
}



export default App;
