import React from 'react';

import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {
  if(localStorage.getItem("token") == null){
    return <Navigate to="/login"/>
  }else{
    return props.children
  }

}
