import React, { useContext, useLayoutEffect ,useState} from 'react';
// import styles from './Profile.module.css';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Profile() {
 let {decodedToken}= useContext(UserContext)
 let [userData,setUserData] = useState([])


  useLayoutEffect(()=>{
    setUserData(decodedToken)
  },[])

  
  
  return <>
  <Helmet>
  <title>Profile</title>
  <meta name="description" content="Helmet application" />
</Helmet>
    <div className="container">
    <div className="row d-flex flex-column my-5 mx-5">
    <div className="col-md-4">
    <h2 className='h1 text-capitalize'>Name : {userData.name}</h2>
    </div>
    <div className="col-md-4">
    <h2 className='h1 text-capitalize'>Role : {userData.role}</h2>
    </div>
    </div>
    </div> 
  </>
}
