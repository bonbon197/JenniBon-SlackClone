'use client' ;
import React from 'react';

import Link from "next/link";
import { useState , useEffect } from 'react'
import { loginUser }
from '../../utils/APILayer'
import { useRouter } from 'next/navigation'

import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

const page = () => {

  localStorage.setItem("loginUser", JSON.stringify({}))
  const router = useRouter();
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');

  const handleSignin = ()=>{
    const userData = {
      email: email,
      password: password
    }
      const response = loginUser(userData);
      response.then(res =>{
        if(res.success === false){
          alert(res.errors[0]);
        }else{
          const saveUser = {
            id:res.data.id,
            email: email,
            password: password
          }
          localStorage.setItem('loginUser', JSON.stringify(saveUser));
          router.push("/main");
        }
      }).catch(err=>{
        console.log(err)
        alert('Please contact your system provider!')
      });
  }
    
  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div className="text-center">
          <h5>SIGN IN</h5>
        </div>
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={(e) => setEmail(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setPassword(e.target.value)}/>
        <div className="text-center">

        <MDBBtn color='dark' className='mb-4' size='lg' onClick={ handleSignin }>Sign in</MDBBtn>
        <p>No account yet? <a href="/signup">Register</a></p>
        </div>
       </MDBContainer>
      
    </>
  )
}

export default page
