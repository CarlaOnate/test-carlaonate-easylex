import {useEffect, useState} from "react";
import Option from "./Option";
//service
import axios from 'axios'
import {PRODUCT_SERVICE} from '../../services'
//styles
import '../../styles/Menu.css'


function Menu({setChange, cartState: {cartItems, setCartItems}}){
    const [products, setItems] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const {data} = await PRODUCT_SERVICE.getProducts()
            console.log("data", data)
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
        <div id="menu">
            {products.length === 0 ? <p>Loading ...</p> : (
                products.map((el) => (
                    <Option key={el._id} el={el} cartItems={cartItems} findQty={findQty} handleAdd={onHandleAdd} handleDel={onHandleDelete}/>
                ))
            )}
        </div>
    )
}

export default Menu;
