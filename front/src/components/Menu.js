import styled, {css} from 'styled-components'
import {useQuery, gql} from "@apollo/client";

//Estos son los estilos de los componentes
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
//En este componente se usan los props para identificar si el elemento ha sido seleccionado
//si esto es correcto se le agregan los estilos correspondientes.
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




//Se define el query para traer el array de productos que se ofrecen
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
    const {loading, data} = useQuery(GETPRODUCTS)

//Función para eliminar elementos del carrito, cuando se hace click en -
    const onHandleDelete = async ({target: {id}}) => {

        const itemIndex = cartState.cart.items.findIndex(el => el.item.type === id)

        if(itemIndex >= 0){
            //Se borra po completo el elemento del carrito ya que tiene 0 elementos
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
                //Se le resta 1 a la llave qty de ese elemento pero no se elimina por completo del carrito
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
        //Se cambia la variable change para poder decirle al estado de
        //Cart que se tiene que volver a calcular el precio.
        setChange(prev => !prev)
    }

    //Función para agregar elemento al carrito, se llama cuando se hace click en +
    const onHandleAdd = async ({target: {id}}) => {
        const itemIndex = cartState.cart.items.findIndex(el => el.item.type === id)
        if(itemIndex >= 0){
            //El elemento esta en el carrito por lo que solo se le suma 1 a la llave qty de ese elemento
            cartState.setCart(prev => {
                let itemsCopy = [...prev.items]
                itemsCopy.splice(itemIndex, 1, {...itemsCopy[itemIndex], qty: itemsCopy[itemIndex].qty + 1})
                return {
                    ...prev,
                    items: itemsCopy
                }
            })
        } else {
            //Si el no esta en el carrito se agrega buscando sus datos dentro de la lista de productos
            // y agregándolo al carrito con llave qty de 1
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

    //Esta función busca un elemento y regresa el valor en qty para poder mostrarlo entre los botones + y -
    const findQty = (type) => {
        const item = cartState.cart.items.find(el => type === el.item.type)
        return item ? item.qty : 0
    }

    //Aquí se muestra el menu de opciones, la lista de productos con botones para agregar o quitar elementos.
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
