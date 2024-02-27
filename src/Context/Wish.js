import axios from "axios";
import { createContext } from "react";

export let WishContext =  createContext();

export default function WishContextProvider(props) {
    async function callApi(){
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
             headers:{
               token:localStorage.getItem("token")
             }
           })
           return data
         }

    return <WishContext.Provider value={{callApi}}>
    {props.children}
    </WishContext.Provider>;
}