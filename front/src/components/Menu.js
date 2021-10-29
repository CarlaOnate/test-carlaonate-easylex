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
    mutation addItem($type: String){
        addItem(type: $type){
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


function Menu({setChange}){
    const {loading, error, data} = useQuery(GETPRODUCTS)
    const [addItem, addItemResponse] = useMutation(ADDITEM)

    console.log(data)

    const onHandleDelete = () => {
        setChange(prev => !prev)
    }

    const onHandleAdd = async ({target}) => {
        //So far so good
        await addItem({
            variables: {type: target.id}
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
