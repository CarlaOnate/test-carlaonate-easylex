import styled, {css} from 'styled-components'
import {useEffect, useState} from "react";
//service
import axios from 'axios'
import {PRODUCT_SERVICE} from '../services/index'

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
`



function Menu({setChange, cartState: {cartItems, setCartItems}}){
    const [products, setItems] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const {data} = await PRODUCT_SERVICE.getProducts()
            setItems(data.products)
        }
        getProducts()
        return () => {
            //Cleanup
            const source = axios.CancelToken.source()
            source.cancel()
        }
    }, [])


    const onHandleDelete = async ({target: {id}}) => {
        const itemIndex = cartItems.findIndex(el => el.item.type === id)

        if(itemIndex >= 0){
            //Se borra po completo el elemento del carrito ya que tiene 0 elementos
            if(cartItems[itemIndex].qty === 1){
                let itemsCopy = [...cartItems]
                itemsCopy.splice(itemIndex, 1)
                setCartItems(itemsCopy)
            } else {
                //Se le resta 1 a la llave qty de ese elemento pero no se elimina por completo del carrito
                let itemsCopy = [...cartItems]
                itemsCopy.splice(itemIndex, 1, {...itemsCopy[itemIndex], qty: itemsCopy[itemIndex].qty - 1})
                setCartItems(itemsCopy)
            }
        }
        //Se cambia la variable change para poder decirle al estado de
        //Cart que se tiene que volver a calcular el precio.
        setChange(prev => !prev)
    }


    const onHandleAdd = async ({target: {id}}) => {
        const itemIndex = cartItems.findIndex(el => el.item.type === id)
        if(itemIndex >= 0){
            //El elemento esta en el carrito por lo que solo se le suma 1 a la llave qty de ese elemento
            let itemsCopy = [...cartItems]
            itemsCopy.splice(itemIndex, 1, {...itemsCopy[itemIndex], qty: itemsCopy[itemIndex].qty + 1})
            setCartItems(itemsCopy)

        } else {
            //TODO:  AQUI SE JODE EL ID!
            //Si el no esta en el carrito se agrega buscando sus datos dentro de la lista de productos
            // y agregándolo al carrito con llave qty de 1
                const {_id: itemId, name, price, type} = products.find(el => el.type === id)
                setCartItems(prev => [...prev, {item: {_id: itemId, name, price, type}, qty: 1}])
            }
        setChange(prev => !prev)
    }

    //Regresa el valor de la llave qty para ser mostrado en el menu de opciones
    //en caso de tener una selección
    const findQty = (type) => {
        const item = cartItems.find(el => type === el.item.type)
        return item ? item.qty : 0
    }


//Esto muestra el menu de opciones de productos con botones para agregar o quitar del carrito
    return (
        <MenuDiv>
            {products.length === 0 ? <p>Loading ...</p> : (
                products.map(({_id, type, name}) => (
                    <Option key={_id} selected={cartItems.length > 0 && findQty(type)}>
                        <button id={type} onClick={onHandleDelete}>-</button>
                        <p>{cartItems.length > 0 ? findQty(type) : 0}</p>
                        <button id={type} onClick={onHandleAdd}>+</button>
                        <p>{name}</p>
                    </Option>
                ))
            )}
        </MenuDiv>
    )
}

export default Menu;
