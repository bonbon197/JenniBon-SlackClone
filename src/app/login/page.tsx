'use client';
import React from 'react';

import Link from "next/link";
import { useState, useEffect } from 'react'
import { loginUser }
  from '../../utils/APILayer'
import { useRouter } from 'next/navigation'
import '../css/main.css'

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    const userData = {
      email: email,
      password: password
    }
    const response = loginUser(userData);
    response.then(res => {
      console.log(res);
      if (res.data.success === false) {
        alert(res.data.errors[0]);
      } else {
        console.log(res.headers.access_token);
        const saveUser = {
          user_id: res.data.data.id,
          email: email,
          password: password,
          access_token: res.headers.access_token,
          client: res.headers.client,
          uid: res.headers.uid,
          expiry: res.headers.expiry
        }
        // console.log(saveUser)
        localStorage.setItem('loginUser', JSON.stringify(saveUser));
        const headers = JSON.parse(localStorage.getItem('loginUser'));
        const activeInChatBox = {
          status: 'offline',
          receiver_id: '',
          receiver_email: '',
          receiver_class: "User",
          access_token: headers.access_token,
          client: headers.client,
          expiry: headers.expiry,
          uid: headers.uid
        }
        localStorage.setItem('activeInChatBox', JSON.stringify(activeInChatBox));
        router.push("/main");
      }
    }).catch(err => {
      console.log(err)
      alert('Please contact your system provider!')
    });
  }

  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50 signinContainer">
        <div className="text-center">
          <h3>SIGN IN</h3>
        </div>
        <MDBInput wrapperClass='mb-4' className="inputsignin" placeholder="Email Address"  id='form1' type='email' onChange={(e) => setEmail(e.target.value)} />
        <MDBInput wrapperClass='mb-4' className="inputsignin" placeholder="Password"  id='form2' type='password' onChange={(e) => setPassword(e.target.value)} />
        <div className="text-center">

          <MDBBtn  className='mb-4 btnsignin' size='lg' onClick={handleSignin}>Sign in</MDBBtn>
          <p>No account yet? <a href="/signup">Register</a></p>
        </div>
      </MDBContainer>

    </>
  )
}

export default page
