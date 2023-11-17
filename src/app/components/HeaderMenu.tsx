'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from "next/link"
import { getUsers } from '../../utils/APILayer'
import { createChannel } from '../../utils/APILayer'

import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select';
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
import { cpSync } from 'fs'

const Header = () => {
  // const [showBasic, setShowBasic] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [basicModal, setBasicModal] = useState(false);
  const headers = JSON.parse(localStorage.getItem('loginUser'));

  //direct message
  const toggleShow = () => setBasicModal(!basicModal);
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
          class_name: receiverEmail,
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

  //channel
  const userData = {
    access_token: headers.access_token,
    client: headers.client,
    expiry: headers.expiry,
    uid: headers.uid
  }

  const [usersList, setUsersList] = useState([]);
  const [runOnceGetUsers, setRunOnceGetUsers] = useState(false);
  const callGetusers = () => {
    if (!runOnceGetUsers) {
      const users = getUsers(userData);
      users.then(res => {
        setUsersList(res.data);
        setRunOnceGetUsers(true);
      })
    }
  }
  callGetusers();

  const [userOptions, setUserOptions] = useState([])
  const [runUserOption, setRunUserOption] = useState(false)
  const saveUsersOption = () => {
    if (usersList.length > 0 && !runUserOption) {
      for (let i = 0; i < usersList.length; i++) {
        const saveUsers = {
          value: usersList[i].id,
          label: usersList[i].email
        }
        userOptions.push(saveUsers);
      }
      setRunUserOption(true);
    }
  }
  saveUsersOption();


  const [channelModal, setChannelModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const channelModalShow = () => setChannelModal(!channelModal);

  const [channelIds, setChannelIds] = useState([])

  const handleSelectedIds = (e: { value: any }[]) => {
    const getChannelIds = [];
    if (e.length > 0) {
      for (let i = 0; i < e.length; i++) {
        getChannelIds.push(e[i].value);
      }
      setChannelIds(getChannelIds)
    }
  }


  const handleCreateChannel = () => {
    console.log('channels')
    // console.log(channelName)
    console.log(channelIds)
    const channelDetails = {
      access_token: headers.access_token,
      client: headers.client,
      expiry: headers.expiry,
      uid: headers.uid,
      name: channelName,
      user_ids: channelIds
    }

    const response = createChannel(channelDetails)
    console.log(response)
    response.then(res => {
      console.log(res);
      if (res.data) {
        setChannelName('');
        setChannelModal(!channelModal)
        location.reload();
      }
      if (res.errors) {
        alert(res.errors[0])
      }
    })
  }

  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light' className='sticky headerContainer'>
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
              <MDBInput label="channelName" id="channelName" className="text-dark" value={channelName} onChange={(e) => setChannelName(e.target.value)} required />
              <Select
                defaultValue={[]}
                isMulti
                name="users"
                options={userOptions}
                className="basic-multi-select m-2 text-dark"
                classNamePrefix="select"
                onChange={handleSelectedIds}
                required
              />
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
