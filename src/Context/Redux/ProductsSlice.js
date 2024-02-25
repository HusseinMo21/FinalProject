import { createSlice } from "@reduxjs/toolkit";


let intialState = {counter:0}
let productsSlice = createSlice({
    name:"products",
    initialState:intialState,
    reducers:{
        incress:(state)=>{
            state.counter+=1
        },
        decrement:(state)=>{
            state.counter-=1
        }
    }
}) 

export let ProductReducer= productsSlice.reducer
export let {incress,decrement} = productsSlice.actions