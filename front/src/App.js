import Menu from "./components/Menu"
import Cart from "./components/Cart"
import styled from 'styled-components'
import {useEffect, useState} from "react";



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
    const [cart, setCart] = useState({
        id: '',
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0
    })

if(!cart) return <p>Loading...</p>

    //Si se picó el botón de continuar se muestra esto
if(continueClicked){
    return (
        <>
            <h1>Tu selección fue la siguiente:</h1>
            <Cart change={change} cartID={cart}/>
        </>
    )
}

//Se muestran los componentes de la aplicación y se les pasan los estados por props
    return (
    <AppDiv>
        <h1>Selecciona los contratos que necesitas:</h1>
        <p>Eliges todos los documentos que necesites y realiza tu pago. Contéstalos y descárgalos cuando los necesites.</p>
        <div>
             <Menu setChange={setChange} cartState={{cart, setCart}}/>
             <Cart change={change} cartState={{cart, setCart}}/>
        </div>
    </AppDiv>
  );
}



export default App;
