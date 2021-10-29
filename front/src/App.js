import Menu from "./components/Menu"
import { useMutation, gql } from "@apollo/client";
import styled from 'styled-components'




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
    </div>
  );
}



export default App;
