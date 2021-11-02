import styled from 'styled-components'
import {useEffect} from 'react'
import {gql, useMutation} from "@apollo/client";
import {ReactComponent as Arrow} from '../arrow.svg'

//Abajo se encuentran los estilos de este componente
const CartDiv = styled.div`
    display: flex;
    margin: 5px;
    padding-bottom: 30px;
    flex-grow: 2;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #EEFFFC;
    border-radius: 15px;
    h4 {
        margin-top: 30px;
        width:85%;
        color: #1A2871;
    }
    button {
        height: 50px;
        width: 150px;
        border-radius: 10px 0px 0px 10px;
        padding: 10px;
        margin-top: 20px;
        border: none;
        background-color: #4EC9C5;
        color: white;
        align-self: flex-end;
    }
    button>div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
            margin: 0;
        }
        svg {
            height: 22px;
        }
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        height: 100%;
        flex-grow: 1;
        height: 100%;
        justify-content: flex-start;
        padding-bottom: 0;
        button {
            height: 60px;
            width: 150px;
            margin: 40px 0px 20px 0px;
        }
        h4 {
            font-size: 17px;
        }
    }
`

const CartItem = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    p {
        margin: 10px 0px 10px 0px;
    }
    p:nth-child(2){
        flex-grow: 2;
        margin-left: 4px;
    }
    p:last-child {
        font-weight: bold;
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        p {
            font-size: 17px;
        }
    }
`

//Este componente use props para poder mostrar en azul
// solo el componente de discount
const Price = styled.div`    
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    p {
        margin: 10px 0px 10px 0px;
    }
    p:last-child {
        font-weight: bold;
    }
    ${props => props.discount && "color: #1A2871;"} 
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        p {
            font-size: 17px;
        }
    }
`

const Container = styled.div`
    width: 85%;
    hr {
        opacity: 50%;
        border: 1px solid #A6AAB8;
        width: 100%;
    }
    @media screen 
    and (min-device-width : 768px) 
    and (max-device-width : 1281px){
        ${props => !props.show && "display: none"}
    }
`

//Aquí se define el "mutation" que se hará en nuestro servidor
const CALCULATEPRICE = gql`
    mutation calculatePrice($cart: CartInput){
        calculatePrice(cart: $cart){
            discount
            total
            subtotal
            items {
                item {
                    id
                    type
                    price
                    name
                }
                qty
            }
        }
    }
`


//Esta función es el componente donde se muestran los elementos seleccionados
// con el precio calculado para los mismos.
function Cart({change, cartState: {cart, setCart}, saveCart: {saveCart, saveCartRes}}){
    const [calculatePrice, { data }] = useMutation(CALCULATEPRICE);

    //Se calcula el precio solo cuando se agrega o elimina un
    // elemento del carrito, este se mide con el estado "change"
    useEffect(() => {
        const calPrice = async () => {
            await calculatePrice({variables: {cart: cart}})
        }
        calPrice()
    }, [change, calculatePrice])

    useEffect(() => {
    //Se edita el carrito con el precio calculado en el backend.
        data && setCart(prev => ({
            ...prev,
            subtotal: data.calculatePrice.subtotal,
            discount: data.calculatePrice.discount,
            total: data.calculatePrice.total
        }))
    //Se remplaza el carrito por el objeto que regresa el backend
    //El obj es igual al carrito que se guardo en nuestra base de datos.
        if(saveCartRes.data){
            const {items, total, subtotal, discount} = saveCartRes.data.saveCart
            setCart({
                items: items.map(el => ({
                    qty: el.qty,
                    item: {
                        id: el.item.id,
                        name: el.item.name,
                        price: el.item.price,
                        type: el.item.type
                    }
                })),
                total,
                subtotal,
                discount
            })
        }
    }, [data, saveCartRes.data, setCart])

    //Para mandar llamar la función de guardar carrito en la base de datos
    const handleButtonClick = async () => {
        await saveCart({variables: {cart: cart}})
    }

    //Este componente muestra los precios de cada elemento selecionado si hay alguno
    //muestra al igual el total, subtotal y el descuento.
    //El botón de Continuar hace que el carrito almacenado en react hasta ahora se
    //mande al backend para ser guardado en la base de datos.
    return (
        <CartDiv>
            <h4>Actualización de Precio</h4>
            <Container show={cart.items.length > 0}>
            {(cart.items.map(el => (
                <CartItem key={el.item.id}>
                    <p>{el.qty}</p> <p>{el.item.name} </p>
                    <p>${el.item.price} MXN</p>
                </CartItem>
            )))}
            </Container>
            <Container show={true}>
                <hr />
                <Price><p>Subtotal</p> <p>${data && data.calculatePrice.subtotal} MXN</p></Price>
                <Price discount={true}><p>Discount</p> <p>- ${data && data.calculatePrice.discount} MXN</p></Price>
                <Price><p>IVA</p> <p>${data && (data.calculatePrice.subtotal*0.16).toFixed(2)} MXN</p></Price>
                <hr />
                <Price><p>Total</p> <p>${data && data.calculatePrice.total} MXN</p></Price>
            </Container>
            <button onClick={handleButtonClick}>
                <div>
                    <p>Continuar</p>
                    <Arrow />
                </div>
            </button>
        </CartDiv>
    )
}

export default Cart;
