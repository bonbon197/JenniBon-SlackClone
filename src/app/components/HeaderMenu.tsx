'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from "next/link"
import { getUsers } from '../../utils/APILayer'
import Spinner from 'react-bootstrap/Spinner';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBModalFooter,
  MDBNavbar,
} from "mdb-react-ui-kit";

const Header = () => {
  // const [showBasic, setShowBasic] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [basicModal, setBasicModal] = useState(false);
  const [channelModal, setChannelModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const headers = JSON.parse(localStorage.getItem('loginUser'));

  const toggleShow = () => setBasicModal(!basicModal);
  const channelModalShow =()=> setChannelModal(!channelModal);
  const handleGetEmail = () => {
    const userData = {
      access_token: headers.access_token,
      client: headers.client,
      expiry: headers.expiry,
      uid: headers.uid
    }

    const users = getUsers(userData);
    // console.log(users);
    users.then(res => {
      let getID = '';
      let emailExist = false;
      // console.log(res.data.length);
      for (let x = 0; x < res.data.length; x++) {
        if (receiverEmail === res.data[x].email) {
          getID = res.data[x].id;
          emailExist = true;
          // console.log(res.data[x]);
        }
      }
      if (emailExist) {
        const activeInChatBox = {
          status: 'online',
          receiver_id: getID,
          receiver_email: receiverEmail,
          receiver_class: "User",
          access_token: headers.access_token,
          client: headers.client,
          expiry: headers.expiry,
          uid: headers.uid
        }
        localStorage.setItem('activeInChatBox', JSON.stringify(activeInChatBox));
        setBasicModal(!basicModal);
        location.reload();

      } else {
        alert('Please Check Input Email')
      }
    })
  }

  const handleCreateChannel = ()=>{
    console.log('channel')
  }
  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light' className='sticky'>
        <MDBContainer fluid>
          <nav aria-label='breadcrumb'>
            <a href='#' className='text-dark' color='light'>
              <MDBBtn className='text-dark' color='light'>{headers.email}</MDBBtn></a>
            <a href='/login' > <MDBBtn className='text-dark' color='light'>Logout</MDBBtn></a>
            <MDBBtn onClick={toggleShow} className='text-dark' color='light'>
              New Message
            </MDBBtn>
            <MDBBtn onClick={channelModalShow} className='text-dark' color='light'>
              Create Channel
            </MDBBtn>
          </nav>
        </MDBContainer>
      </MDBNavbar>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Input Email</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label="Email" id="receiverEmail" onChange={(e) => setReceiverEmail(e.target.value)} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleGetEmail}>OK</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={channelModal} setShow={setChannelModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Channel</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={channelModalShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label="channelName" id="channelName" onChange={(e) => setChannelName(e.target.value)} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={channelModalShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleCreateChannel}>OK</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </>
  )
}

export default Header
