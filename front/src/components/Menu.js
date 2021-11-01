import styled, {css} from 'styled-components'
import {useQuery, gql} from "@apollo/client";


const MenuDiv = styled.div`
    display: flex;
    flex-grow: 1;
    margin: 5px;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 8px 20px #f5f5f5;
    border-radius: 15px; 
    
    @media screen 
    and (min-device-width : 375px) 
    and (max-device-width : 768px){
      font-size: 11px;
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        height: 100%;
        justify-content: flex-start;
        flex-grow: 2;
    }  
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
        border: none;
        background-color: white;
    }
    button:first-child{
        padding-bottom: 4px;
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
    ${props => props.selected > 0 && css`
            border: none;
            color: #4EC9C5;
            button {
                color: #4EC9C5;
            }
            p:nth-child(2) {
                 border: 1px solid #4EC9C5;
            }  
            box-shadow: 2px 8px 10px #f5f5f5;
    `}
    @media screen 
    and (min-device-width : 375px) 
    and (max-device-width : 667px){
        button {
          font-size: 11px;
        }
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1024px){
       
    }
`





const GETPRODUCTS = gql`
    query getProducts{
     getProducts {
         id
         name
         type
         price
     }
    }
`

function Menu({cartState, setChange}){
    const {loading, error, data} = useQuery(GETPRODUCTS)


    const onHandleDelete = async ({target: {id}}) => {

        const itemIndex = cartState.cart.items.findIndex(el => el.item.type === id)

        if(itemIndex >= 0){
            if(cartState.cart.items[itemIndex].qty === 1){
                cartState.setCart(prev => {
                    let itemsCopy = [...prev.items]
                    itemsCopy.splice(itemIndex, 1)
                    return {
                        ...prev,
                        items: itemsCopy
                    }
                })
            } else {
                cartState.setCart(prev => {
                    let itemsCopy = [...prev.items]
                    itemsCopy.splice(itemIndex, 1, {...itemsCopy[itemIndex], qty: itemsCopy[itemIndex].qty - 1})
                    return {
                        ...prev,
                        items: itemsCopy
                    }
                })
            }
        }
        setChange(prev => !prev)
    }

    const onHandleAdd = async ({target: {id}}) => {
        const itemIndex = cartState.cart.items.findIndex(el => el.item.type === id)
        if(itemIndex >= 0){
            cartState.setCart(prev => {
                let itemsCopy = [...prev.items]
                itemsCopy.splice(itemIndex, 1, {...itemsCopy[itemIndex], qty: itemsCopy[itemIndex].qty + 1})
                return {
                    ...prev,
                    items: itemsCopy
                }
            })
        } else {
            if(data){
                const {id: itemId, name, price, type} = data.getProducts.find(el => el.type === id)
                cartState.setCart(prev => ({
                    ...prev,
                    items: [
                        ...prev.items,
                        {item: {id: itemId, name, price, type}, qty: 1}
                    ]
                }))
            }
        }
        setChange(prev => !prev)
    }

    const findQty = (type) => {
        const item = cartState.cart.items.find(el => type === el.item.type)
        return item ? item.qty : 0
    }

    console.log(cartState.cart)

    return (
        <MenuDiv>
            {loading ? <p>Loading ...</p> : data && (
                data.getProducts.map(({id, type, name}) => (
                    <Option key={id} selected={cartState.cart.items.length > 0 && findQty(type)}>
                        <button id={type} onClick={onHandleDelete}>-</button>
                        <p>{cartState.cart.items.length > 0 ? findQty(type) : 0}</p>
                        <button id={type} onClick={onHandleAdd}>+</button>
                        <p>{name}</p>
                    </Option>
                ))
            )}
        </MenuDiv>
    )
}

export default Menu;
