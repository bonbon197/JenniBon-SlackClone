'use client' ;
import React from 'react';
import Link from "next/link";


import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

const page = () => {
    
  return (
    <>

      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div className="text-center">
          <h5>SIGN IN</h5>
        </div>
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>
        <div className="text-center">
        <a href='/main' className='text-light' ><MDBBtn color='dark' className="mb-4"> Sign in</MDBBtn></a>
        <p>No account yet? <a href="/signup">Register</a></p>
        </div>
       </MDBContainer>
      
    </>
  )
}

export default page
