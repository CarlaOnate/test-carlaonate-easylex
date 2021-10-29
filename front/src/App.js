import Menu from "./components/Menu"
import Cart from "./components/Cart"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'
import {useState} from "react";


function App() {
    //Hook to use mutation
    const [change, setChange] = useState(false);

    return (
    <div>
     <Menu changeState={{change, setChange}}/>
     <Cart change={change}/>
    </div>
  );
}



export default App;
