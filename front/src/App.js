import Menu from "./components/Menu"
import { useMutation, gql } from "@apollo/client";
import {useEffect} from "react";


const CREATE_CART = gql`
    mutation createCart{
        createCart
    }
`


function App() {
    //Hook to use mutation
    const [createCart] = useMutation(CREATE_CART);

    return (
    <div>
     <Menu />
     <p> jiji </p>
    </div>
  );
}

export default App;
