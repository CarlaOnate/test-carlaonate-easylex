import styled from 'styled-components'
import {useQuery, gql, useMutation} from "@apollo/client";
import {useEffect, useState} from "react";


const MenuDiv = styled.div`
    @media screen 
    and (min-device-width : 375px) 
    and (max-device-width : 667px){
      font-size: 11px;
    }
    display: flex;
    flex-grow: 1;
    margin: 10px;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 10px 20px #DBDBDA;
    border-radius: 10px;    
`

const Option = styled.div`
    display: flex;
    width: 85%;
    max-height: 25px;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    text-align: center;
    button {
        @media screen 
        and (min-device-width : 375px) 
        and (max-device-width : 667px){
              font-size: 11px;
        }
        border: none;
        background-color: white;
    }
    p:nth-child(2) {
        margin: 0px 2px 0px 2px;
        padding: 1px 3px 2px 3px;
        border: 1px solid #DBDBDA;
        border-radius: 5px;    
    }   
    p:last-child{
        text-align: center;
        margin: 0px 0px 0px 15px;
    }
    border: 1px solid #DBDBDA;
    border-radius: 10px;    
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
        addItem(type: $type, cartId: $cartId)
    }
`

const DELETEITEM = gql`
    mutation deleteItem($type: String, $cartId: ID){
        deleteItem(type: $type, cartId: $cartId)
    }
`

const GETCART = gql`
    query getCart($cartId: ID){
        getCart(cartId: $cartId){
            items {
                item {
                    type
                }
                qty
            }
        }
    }
`


function Menu({setChange, cartID}){
    const {loading, error, data} = useQuery(GETPRODUCTS)

    const updatedCart = useQuery(GETCART, {variables: {cartId: cartID}})

    const [addItem] = useMutation(ADDITEM, {refetchQueries: [GETCART, 'getCart']})
    const [delItem] = useMutation(DELETEITEM, {refetchQueries: [GETCART, 'getCart']})

    const [itemsState, setItems] = useState([])

    useEffect(() => {
        if(updatedCart.data){
            setItems(updatedCart.data.getCart.items)
        }
    }, [updatedCart])

    const onHandleDelete = async ({target}) => {
        await delItem({
            variables: {type: target.id, cartId: cartID}
        })
        setChange(prev => !prev)
    }

    const onHandleAdd = async ({target}) => {
        await addItem({
            variables: {type: target.id, cartId: cartID}
        })
        setChange(prev => !prev)
    }

    const findQty = (type) => {
        const item = itemsState.find(el => type === el.item.type)
        return item ? item.qty : 0
    }


    return (
        <MenuDiv>
            {loading ? <p>Loading ...</p> : (
                data.getProducts.map(({id, type, name}) => (
                    <Option key={id}>
                        <button id={type} onClick={onHandleDelete}>-</button>
                        <p>{itemsState.length > 0 ? findQty(type) : 0}</p>
                        <button id={type} onClick={onHandleAdd}>+</button>
                        <p>{name}</p>
                    </Option>
                ))
            )}
        </MenuDiv>
    )
}

export default Menu;
