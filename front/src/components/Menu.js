import styled from 'styled-components'
import {useQuery, gql, useMutation} from "@apollo/client";
import {useEffect, useState} from "react";


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
//
// const ADDITEM = gql`
//     mutation addItem($type: String, $cartId: ID){
//         addItem(type: $type, cartId: $cartId){
//             id
//             items {
//                 item {
//                     type
//                 }
//                 qty
//             }
//             subtotal
//             discount
//             total
//         }
//     }
// `
//
//
//
// const DELETEITEM = gql`
//     mutation deleteItem($type: String, $cartId: ID){
//         deleteItem(type: $type, cartId: $cartId){
//             id
//             items {
//                 item {
//                     type
//                 }
//                 qty
//             }
//             subtotal
//             discount
//             total
//         }
//     }
// `

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
                        {itemsState.length > 0 ? findQty(type) : 0}
                        <button id={type} onClick={onHandleAdd}>+</button> {name}
                    </Option>
                ))
            )}
        </MenuDiv>
    )
}

export default Menu;
