import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductsSlice";


let store = configureStore({
    reducer: {
        products: ProductReducer
    },
})


export default store