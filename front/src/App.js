import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useEffect, useState} from "react";

/*En esta versión cada cambio en el carrito se guarda en la base de datos y se
actualiza el carrito con lo que regrese el request. Por lo mismo se tiene un poco de "lag"
por lo que funciona correctamente pero se tiene un periodo de respuesta lento.
En lo personal esta versión no es la mejor debido a que se hacen muchos requests
La segunda versión de react-cart hace la funcionalidad del carrito en el front, por
lo que la respuesta es inmediata y solo hace req al backend en 3 ocasiones.*/


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

//Se define la mutation para crear el carrito en el ComponentDidMount usando un UseEffect
const CREATE_CART = gql`
    mutation createCart{
        createCart
    }
`


function App() {
    //Hook to use mutation
    const [createCart, {data}] = useMutation(CREATE_CART);
    //Estados de cambio, carrito para guardar respuesta de backend, y estado para manejar el click del
    //boton de continuar
    const [change, setChange] = useState(false);
    const [cart, setCart] = useState()
    const [continueClicked, setContinueClicked] = useState(false)

    //Este useEffect se corré 1 vez cuando empieza la app para crear un carrito en la DB y regresar su id
    useEffect(() => {
        const newCart = async () => {
            await createCart()
        }
        newCart()
    }, [createCart])

    //Se corre cada vez que la data del carrito sea regresada para guardarlo en el estado
    useEffect(() => {
        if(data){
            setCart(data.createCart)
        }
    }, [data])


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
             <Menu setChange={setChange} cartID={cart}/>
             <Cart change={change} cartID={cart} setClicked={setContinueClicked}/>
        </div>
    </AppDiv>
  );
}



export default App;
