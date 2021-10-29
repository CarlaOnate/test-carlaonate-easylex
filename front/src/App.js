import Menu from "./components/Menu"
import { useMutation, gql } from "@apollo/client";
import {useEffect} from "react";


const ADD_ITEM = gql`
    mutation createCart{
        createCart
    }
`


function App() {
    //Hook to use mutation
    const [createCart] = useMutation(ADD_ITEM);

    return (
    <div>
     <Menu />
     <p> jiji </p>
    </div>
  );
}

export default App;
