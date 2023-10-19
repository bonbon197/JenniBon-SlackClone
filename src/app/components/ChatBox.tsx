'use client' ;
import React from 'react'
import { useState } from 'react'
import { sendMessage } from '../../utils/APILayer'
import '../components/chatbox.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
  MDBInput,
} from "mdb-react-ui-kit";

const chatbox = () => {
  const [email, setEmail] = useState('');
  const [message , setMessage] = useState('');

  const handleSendMess = ()=>{
    const userData = {
      
    }
    console.log(email);
    console.log(message);

  }

  
  return (
    <>
       <MDBTypography listUnStyled className="text-white">
            {/* <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard className="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 12 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li className="d-flex justify-content-between mb-4">
              <MDBCard className="w-100 mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Lara Croft</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 13 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                  </p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>
            <li className="d-flex justify-content-between mb-4">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                width="60"
              />
              <MDBCard className="mask-custom">
                <MDBCardHeader
                  className="d-flex justify-content-between p-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                >
                  <p className="fw-bold mb-0">Brad Pitt</p>
                  <p className="text-light small mb-0">
                    <MDBIcon far icon="clock" /> 10 mins ago
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </MDBCardBody>
              </MDBCard>
            </li>
            <li className="mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4} />
            </li>
            <MDBBtn color="light" size="lg" rounded className="float-end">
              Send
            </MDBBtn> */}
            <li className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="envelope me-3" size='lg'/>
              <MDBInput label='Enter Email' id='email' type='email'  onChange={(e) => setEmail(e.target.value)}/>
            </li>

            <li className="mb-3">
              <MDBTextArea label="Message" id="textAreaExample" rows={4}  onChange={(e) => setMessage(e.target.value)}/>
            </li>
            
            <MDBBtn color="light" size="lg" rounded className="float-end" onClick={handleSendMess}>
              Send
            </MDBBtn>
          </MDBTypography>
    </>
  )
}

export default chatbox
