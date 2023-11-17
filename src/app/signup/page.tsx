'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUser } from '../../utils/APILayer';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { createLocalUser } from '../../utils/CreateLocal';

const RegistrationPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleSubmit = async () => {
      const { password, passwordConfirmation } = formData;
  
      if (password.length < 6) {
          // Display error message within the component
          console.error('Password must be at least six characters');
      } else if (password !== passwordConfirmation) {
          // Display error message within the component
          console.error('Passwords do not match');
      } else {
          try {
              const response = await createUser(formData);
  
              if (response.status === 'error') {
                  // Display error message within the component
                  console.error(response.errors.full_messages[0]);
              } else {
                  createLocalUser(formData.name, response.data); 
                  router.push('/login');
              }
          } catch (err) {
              console.error(err);
              // Display a user-friendly error message within the component
          }
      }
  };
  

    return (
      <>
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='Your Name' id='form1' type='text' name='name' onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className='w-100' />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='email' type='email' name='email' onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='password' type='password' name='password' onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="key me-3" size='lg' />
                                <MDBInput label='Confirm your password' id='confirmPassword' type='password' name='passwordConfirmation' onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            </div>

                            <div className='mb-4'>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I do accept the Terms and Conditions of your site.' />
                            </div>

                            <MDBBtn color='dark' className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>
                            <div className="text-center">
                                <p>Already have an account? <Link href="/login">Login</Link></p>
                            </div>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    </>
    );
};

export default RegistrationPage;
