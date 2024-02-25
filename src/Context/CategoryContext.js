import axios from "axios";
import { createContext } from "react";

export let CategoryContext = createContext()

export default function CategoryContextProvider(props) {
    
    
    async function getSpacificCategories(id){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        return data
      }
    
      async function getSpcBrand(id){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        return data
      }
    
    
      async function getsubCategories(id){
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`)
        return data
      }
    
    
    
    return (
        <CategoryContext.Provider value={{getSpacificCategories,getSpcBrand,getsubCategories}}>
            {props.children}
        </CategoryContext.Provider>
    )
}