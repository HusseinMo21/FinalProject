import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function Cart() {
let [cartItems,setCartItems] = useState([])
 let {getCart,deleteCart,UpdateCartQuantity} = useContext(CartContext)

async function deleteCartItem(id){
  let {data} = await deleteCart(id)
  setCartItems(data)
}
async function getCartItems(){
  let {data} = await  getCart()
  setCartItems(data)
 } 

async function updateCartItem(id,count){
  let {data} = await UpdateCartQuantity(id,count)
  setCartItems(data)
}



 useEffect(() => {
   getCartItems()
   
 }, [cartItems.length === 0])

  return <>
    <section className='bg-light mx-5 px-5 my-3'>
    <h2>Shop Cart :</h2>
    <p className='text-main fs-4'>Total Cart Price : <span>{cartItems.totalCartPrice} EGP</span></p>
    {cartItems?.products?.map((product)=>(
      <div key={product._id} className="row mb-3 border-bottom border-info">
      <div className="col-md-1">
      <img src={product.product.imageCover} className='w-100' alt="" />
      </div>
      <div className="col-md-11">
      <p>{product.product.title}</p>
      <div className="d-flex justify-content-between align-items-center">
      <p className='text-main'>Price : <span>{product.price} EGP</span></p>
      <p><span className='border border-info mx-2 px-2 cursor-pointer' onClick={()=>updateCartItem(product.product.id,product.count+1)}>+</span> {product.count} <span className='border border-info mx-2 px-2 cursor-pointer' onClick={()=>updateCartItem(product.product.id,product.count-1)}>-</span></p>
      </div>
     <i onClick={()=>deleteCartItem(product.product.id)} className='fa fa-trash text-success btn mb-3 p-1'><span className='mx-2 text-dark'>Remove</span></i>
      </div>
      </div>
    ))}

    <button className='btn btn-success w-100'>CheckOut</button>
    </section>
  </>
}
