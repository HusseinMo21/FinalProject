import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserContext=createContext();


export default function UserContextProvider(props){
 
    const [userToken,setuserToken]=useState(null);
    const token = localStorage.getItem("token");
    const decodedToken=token?jwtDecode(token):{};
    const {id}=decodedToken;


    async function getOrders(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then(res=>res)
        .catch(err=>err)
       }


return <UserContext.Provider value={{userToken,setuserToken,id,getOrders}}>
    {props.children}
    </UserContext.Provider>
}