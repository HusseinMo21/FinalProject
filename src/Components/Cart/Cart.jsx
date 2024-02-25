import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Loader from './../Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
let [cartItems,setCartItems] = useState([])
 let {getCart,deleteCart,UpdateCartQuantity} = useContext(CartContext)
 let [isLoading,setIsLoading ]=useState(true)

async function deleteCartItem(id){
  let {data} = await deleteCart(id)
  setCartItems(data)
  setIsLoading(false)
}
async function getCartItems(){
  let {data} = await  getCart()
  if(data ===undefined){
    setCartItems([])
    setIsLoading(false)
    alert("Cart is Empty")
  }else{
    setCartItems(data)
    setIsLoading(false)
  }

}


async function updateCartItem(id,count){
  let {data} = await UpdateCartQuantity(id,count)
  setCartItems(data)
  setIsLoading(false)
}



 useEffect(() => {
   getCartItems()
   
 }, [cartItems.length === 0])

  return <>
 
    <section className='bg-dark mx-5 px-5 my-3'>
    {cartItems?<> <h2>Shop Cart :</h2>
    <p className='text-main fs-4'>Total Cart Price : <span>{cartItems.totalCartPrice} EGP</span></p>
    {isLoading? <Loader /> :  cartItems?.products?.map((product)=>(
      <div key={product._id} className="row mb-3 border-bottom border-info">
      <div className="col-md-1">
      <img src={product.product.imageCover} className='w-100' alt="" />
      </div>
      <div className="col-md-11">
      <p>{product.product.title}</p>
      <div className="d-flex justify-content-between align-items-center">
      <p className='text-main'>Price : <span>{product.price} EGP</span></p>
      <p className='text-white'><span className='border border-info mx-2 px-2 cursor-pointer ' onClick={()=>updateCartItem(product.product.id,product.count+1)}>+</span> {product.count} <span className='border border-info mx-2 px-2 cursor-pointer' onClick={()=>updateCartItem(product.product.id,product.count-1)}>-</span></p>
      </div>
     <i onClick={()=>deleteCartItem(product.product.id)} className='fa fa-trash text-success btn mb-3 p-1'><span className='mx-2 text-white'>Remove</span></i>
      </div>
      </div>
      ))}
      </>:<Loader />}
    
      <Helmet>
      <title>Cart</title>
      <meta name="description" content="Helmet application" />
  </Helmet>
    <Link to="/checkout" className='btn btn-success w-100'>CheckOut</Link>
    </section>
  </>
}
