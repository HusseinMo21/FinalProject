import axios from "axios";
import { createContext, useState } from "react";
export let CartContext=createContext();


export default function CartContextProvider(props){
     let [numberOfProducts,setNumberOfProducts]= useState(0)
     let [cartId,setCartId]= useState("")
   async function addToCart(productId){
       let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId:productId
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setNumberOfProducts(data.numOfCartItems)
        localStorage.setItem("numOfCartItems",data.numOfCartItems)
        return data
        
    }

    async function getCart(){
     try {
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setNumberOfProducts(data?.numOfCartItems)
        localStorage.setItem("numOfCartItems",data.numOfCartItems)
        setCartId(data?.data._id)
        return data
        
     } catch (error) {
        return error
     }
      
        
    }

    async function deleteCart(id){
        let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
        setNumberOfProducts(data.numOfCartItems)
        localStorage.setItem("numOfCartItems",data.numOfCartItems)
        return data


    }

    async function UpdateCartQuantity(id,count){
       let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
           count:count
       },{
           headers:{
               token:localStorage.getItem("token")
           }
       })
       setNumberOfProducts(data.numOfCartItems)
       localStorage.setItem("numOfCartItems",data.numOfCartItems)
       return data
    }

    return <CartContext.Provider value={{setNumberOfProducts,cartId,addToCart,getCart,numberOfProducts,deleteCart,UpdateCartQuantity}}>
    {props.children}
    </CartContext.Provider>
}