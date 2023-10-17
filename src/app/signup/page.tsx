'use client' ;
import React, { useEffect } from 'react'
import { useState } from 'react'
import { createUser }
from '../../utils/APILayer'
import Link from "next/link"
import { useRouter } from 'next/navigation'

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }

  from 'mdb-react-ui-kit';
  const page = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  // const [usersAcct, setusersAcct]= useState([]);

  useEffect(()=>{
  //   localStorage.setItem("loginUser", JSON.stringify({}))
  // if(localStorage.getItem('accounts')){
  //   const accts = localStorage.getItem('accounts');
  //   setusersAcct(accts)
  // }    
  },[]);

  const handleSubmit = async() => {
    if(password.length < 6){
      alert('password must be alteast six characters');
    }else{
      const userData = {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        name : name
      }
        const response = createUser(userData);
        response.then(res =>{
          if(res.status === 'error'){
            alert(res.errors.full_messages[0]);
          }else{
          // usersAcct.push(userData);
          //   localStorage.setItem('accounts', JSON.stringify(usersAcct))
            router.push("/login");
          }
        }).catch(err=>{
          console.log(err)
          alert('Please contact your system provider!')
        });
       
    }
    // console.log(users)
  }

  return (
    <>
      <MDBContainer fluid>

        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
            <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='name' type='text' className='w-100' onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email' id='email' type='email' onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password' id='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Confirm your password' id='confirmPassword' type='password' onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>

                <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I do accept the Terms and Conditions of your site.' />
                </div>

                <MDBBtn color='dark' className='mb-4' size='lg' onClick={ handleSubmit }>Register</MDBBtn>
                <div className="text-center">
                <p>Already have an account? <a href="/login">Login</a></p>
                </div>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

            </MDBRow>
        </MDBCardBody>
        </MDBCard>

        </MDBContainer>
      
    </>
  )
}

export default page
