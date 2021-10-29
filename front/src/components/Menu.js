import styled from 'styled-components'
import { useQuery, gql } from "@apollo/client";


const MenuDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const Option = styled.div`
    flex-direction: row;
    justify-content: space-between;  
`

const GETPRODUCTS = gql`
    query getProducts{
     getProducts {
         id
         name
         type
     }
    }
`


function Menu(){
    const {loading, error, data} = useQuery(GETPRODUCTS)
    console.log(data)

    return (
        <MenuDiv>
            {loading ? <p>Loading ...</p> : (
                data.getProducts.map(({id, type, name}) => (
                    <Option key={id} id={type}><button>-</button>{name}<button>+</button></Option>
                ))
            )}
        </MenuDiv>

    )
}

export default Menu;
