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


const ADDITEM = gql`
    mutation addItem($type: String, $cartId: ID){
        addItem(type: $type, cartId: $cartId){
             id
            items {
                item {
                    type
                }
                qty
            }  
            subtotal
            discount
            total
        }
    }
`


function Menu({setChange, cart}){
    const {loading, error, data} = useQuery(GETPRODUCTS)
    const [addItem, addItemResponse] = useMutation(ADDITEM)

    const [itemsState, setItems] = useState()

    useEffect(() => {
        if(addItemResponse.data){
            setItems(addItemResponse.data.addItem.items)
            console.log(addItemResponse.data.addItem.items)
        }
    }, [addItemResponse])

    // data:
    //     addItem:
    //         discount: 0
    // id: "617c839d5ce7c5c87671ee20"
    // items: Array(1)
    // 0:
    // item: {type: 'Nda', __typename: 'Product'}
    // qty: 1
    // __typename: "Items"
    //     [[Prototype]]: Object
    // length: 1
    //     [[Prototype]]: Array(0)
    // subtotal: 0


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
                        {itemsState && findQty(type)}
                        <button id={type} onClick={onHandleAdd}>+</button> {name}
                    </Option>
                ))
            )}
        </MenuDiv>

    )
}

export default Menu;
