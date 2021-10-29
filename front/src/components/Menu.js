import styled from 'styled-components'
import {useQuery, gql, useMutation} from "@apollo/client";


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


const ADDITEM = gql`
    mutation addItem($type: String, $cartId: ID){
        addItem(type: $type, cartId: $cartId){
             id
            items {
                type
                name
                qty
            }  
            subtotal
            discount
            total
        }
    }
`


function Menu({setChange, cart}){
    console.log(cart)
    const {loading, error, data} = useQuery(GETPRODUCTS)
    const [addItem, addItemResponse] = useMutation(ADDITEM)

    const onHandleDelete = () => {
        setChange(prev => !prev)
    }

    const onHandleAdd = async ({target}) => {
        //So far so good
        cart && await addItem({
            variables: {type: target.id, cartId: cart.createCart}
        })
        setChange(prev => !prev)
    }

    return (
        <MenuDiv>
            {loading ? <p>Loading ...</p> : (
                data.getProducts.map(({id, type, name}) => (
                    <Option key={id}>
                        <button id={type} onClick={onHandleDelete}>-</button>
                        {name}
                        <button id={type} onClick={onHandleAdd}>+</button>
                    </Option>
                ))
            )}
        </MenuDiv>

    )
}

export default Menu;
