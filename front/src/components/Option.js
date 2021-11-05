import React from 'react'
import '../styles/Option.css'

// const Option = styled.div`
//     display: flex;
//     width: 85%;
//     max-height: 25px;
//     flex-direction: row;
//     align-items: center;
//     padding: 5px;
//     text-align: center;
//     button {
//         border: none;
//         background-color: white;
//     }
//     button:first-child{
//         padding-bottom: 4px;
//     }
//     p:nth-child(2) {
//         margin: 0px 2px 0px 2px;
//         padding: 1px 3px 2px 3px;
//         border: 1px solid #DBDBDA;
//         border-radius: 5px;
//     }
//     p:last-child{
//         text-align: center;
//         margin: 0px 0px 0px 15px;
//     }
//     border: 1px solid #DBDBDA;
//     border-radius: 10px;
//     ${props => props.selected > 0 && css`
//             border: none;
//             color: #4EC9C5;
//             button {
//                 color: #4EC9C5;
//             }
//             p:nth-child(2) {
//                  border: 1px solid #4EC9C5;
//             }
//             box-shadow: 2px 8px 10px #f5f5f5;
//     `}
//     @media screen
//     and (min-device-width : 375px)
//     and (max-device-width : 768px){
//         button {
//           font-size: 11px;
//         }
//     }
//     @media screen
//     and (min-device-width : 768px)
//     and (max-device-width : 1024px){
//
//     }
// `


function Option({el, cartItems, findQty, handleAdd, handleDel}){

    return (
        <div id="option" key={el._id} className={cartItems.length > 0 && findQty(el.type) > 0 && "selected"}>
            <button id={el.type} onClick={handleDel}>-</button>
            <p>{cartItems.length > 0 ? findQty(el.type) : 0}</p>
            <button id={el.type} onClick={handleAdd}>+</button>
            <p>{el.name}</p>
        </div>
    )
}

export default Option;
