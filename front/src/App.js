import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useState} from "react";




const ADD_ITEM = gql`
    mutation createCart{
        createCart
    }
`


function App() {
    //Hook to use mutation
    const [createCart] = useMutation(ADD_ITEM);
    const [change, setChange] = useState(false);

    return (
    <div>
     <Menu changeState={{change, setChange}}/>
     <Cart change={change}/>
    </div>
  );
}



export default App;
