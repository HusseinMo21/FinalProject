import React, { useContext, useEffect ,useState} from 'react';
// import styles from './Profile.module.css';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
 let {getOrders}= useContext(UserContext)
 let [userData,setUserData] = useState([])

 async function getData () {
    let {data} = await getOrders()
    console.log(data[0].user);
    setUserData(data[0].user)
  }

  useEffect(()=>{
    getData()
  },[])

  return <>
    <div className="container">
    <div className="row">
    <div className="col-md-4">
    
    </div>
    </div>
    </div>
  </>
}
