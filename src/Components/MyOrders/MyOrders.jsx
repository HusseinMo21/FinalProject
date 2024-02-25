import React, { useContext, useEffect, useState } from 'react';
// import styles from './MyOrders.module.css';
import { UserContext } from './../../Context/UserContext';


export default function MyOrders() {
 const {getOrders}= useContext(UserContext);
 let [data,setData] = useState([])
  async function getorders(){
   let {data}= await getOrders();
   setData(data)
  }
useEffect(()=>{
  getorders()
})

  return <>
    <section>
    <h2 className='mt-5 mx-4'>MyOrders</h2>
    <div className="container">
    <div className="row">
    
    </div>
    </div>
    
    </section>

  </>
}
