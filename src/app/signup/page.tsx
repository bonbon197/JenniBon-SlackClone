'use client';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { createUser } from '../../utils/APILayer'
import { getDB, setDB } from '../../db/DBLayer'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import '../css/main.css'

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

import { createLocalUser } from '../../utils/CreateLocal';

const page = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [name, setName] = useState('');
  const [acceptTC, setAcceptTC] = useState(false)

  console.log(acceptTC);

  // const handleAcceptTC =(e)=>{
  //   console.log(e.target.checked)

  // }


  const handleSubmit = async () => {
    if(!acceptTC){
      alert('accept terms and conditions!');
      return
    }
    if (password.length < 6 ) {
      alert('password must be alteast six characters');
    } else {
      const userData = {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
        // name : name
      }
      const response = createUser(userData);
      response.then(res => {

        if (res.status === 'error') {
          alert(res.errors.full_messages[0]);
        } else {
          createLocalUser(name, res);
          alert('Registered successfully!');
          router.push("/login");
        }
      }).catch(err => {
        console.log(err)
        alert('Please contact your system provider!')
      });
    }
    
  }
  return (
    <>
      <MDBContainer fluid style={{ width:'50%' }} className='signupContainer'>

        <MDBCard className='text-black m-5 d-flex flex-column text-center align-items-center signupCard' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            {/* <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'> */}
                <p className="text-center h3 mb-3 mx-1 mx-md-4 mt-4">SIGN UP</p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput  required className='signupInput' id='form1' type='text' placeholder="Your Name" onChange={(e) => setName(e.target.value)}  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput required className='signupInput' id='email' type='email' placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput required className='signupInput' id='password' type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput required className='signupInput' placeholder='Confirm your password' id='confirmPassword' type='password' onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>

                <div className='mb-4'>
                  <MDBCheckbox required name='flexCheck' value='' id='flexCheckDefault' label='I do accept the Terms and Conditions of your site.' onChange={(e)=> setAcceptTC(e.target.checked)} />
                </div>

                <MDBBtn color='dark' className='mb-4 btnSignup' size='lg' type='submit' onClick={handleSubmit}>Register</MDBBtn>
                <div className="text-center">
                  <p>Already have an account? <a href="/login">Login</a></p>
                </div>

              {/* </MDBCol> */}

              {/* <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol> */}

            {/* </MDBRow> */}
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>

    </>
  )
}

export default page
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

