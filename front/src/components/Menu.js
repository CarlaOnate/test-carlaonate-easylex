import styled, {css} from 'styled-components'
import {useQuery, gql, useMutation} from "@apollo/client";
import {useEffect, useState} from "react";

//Estilos de este componente
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

//Se hace uso de props de styled componentes para cambiar estilos en caso de selección
//de algun elemento
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




//Se define el query para traer productos guardados en DB
const GETPRODUCTS = gql`
    query getProducts{
     getProducts {
         id
         name
         type
     }
    }
`

//mutation para agregar elemento al carrito en el backend - regresa un string
const ADDITEM = gql`
    mutation addItem($type: String, $cartId: ID){
        addItem(type: $type, cartId: $cartId)
    }
`

//mutation para borrar elemento del carrito en el backend - regresa un string
const DELETEITEM = gql`
    mutation deleteItem($type: String, $cartId: ID){
        deleteItem(type: $type, cartId: $cartId)
    }
`

//query para traer elementos del carrito guardados en DB
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
    const {loading, data} = useQuery(GETPRODUCTS)
    //query se llama cada vez que se hace un cambio en el carrito
    const updatedCart = useQuery(GETCART, {variables: {cartId: cartID}})

    const [addItem] = useMutation(ADDITEM, {refetchQueries: [GETCART, 'getCart']})
    const [delItem] = useMutation(DELETEITEM, {refetchQueries: [GETCART, 'getCart']})

    //Estado para guardar el resultado de updatedCart, esto para que no se vea un cambio abrupto
    //en nuestro componente cuando los elementos desaparecen mientas se espera respuesta del backend
    const [itemsState, setItems] = useState([])

    //Se corre cada vez que cambio updatedCart que regresa el carrito actualizado después de un cambio
    useEffect(() => {
        if(updatedCart.data){
            setItems(updatedCart.data.getCart.items)
        }
    }, [updatedCart])

    //Llama a la mutation para borrar el elemento del carrito en el backend
    const onHandleDelete = async ({target}) => {
        await delItem({
            variables: {type: target.id, cartId: cartID}
        })
        setChange(prev => !prev)
    }
    //Llama a la mutation para agregar al elemento en el carrito en el backend
    const onHandleAdd = async ({target}) => {
        await addItem({
            variables: {type: target.id, cartId: cartID}
        })
        setChange(prev => !prev)
    }

    //Regresa el valor de la llave qty para ser mostrado en el menu de opciones
    //en caso de tener una selección
    const findQty = (type) => {
        const item = itemsState.find(el => type === el.item.type)
        return item ? item.qty : 0
    }

//Esto muestra el menu de opciones de productos con botones para agregar o quitar del carrito
    return (
        <MenuDiv>
            {loading ? <p>Loading ...</p> : (
                data.getProducts.map(({id, type, name}) => (
                    <Option key={id} selected={itemsState.length > 0 && findQty(type)}>
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
