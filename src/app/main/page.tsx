'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import ChatBox from '../components/ChatBox';
import SideBarName from '../components/SideBarName';
import HeaderMenu from '../components/HeaderMenu';
import '../css/main.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
const page = () => {
  const headers = JSON.parse(localStorage.getItem('loginUser'));
  const getActiveInChatBox = JSON.parse(localStorage.getItem('activeInChatBox'));
  const [activeInChatBox, setActiveInChatBox] = useState(getActiveInChatBox)

  localStorage.setItem('createdChannel', JSON.stringify({
    name:'updateChannel',
    status: false
  }))
  


  // console.log(activeInChatBox.status);

  return (
    <>
      <HeaderMenu />
      <MDBContainer fluid className="py-5 gradient-custom mainBody">
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className=" mb-4 mb-md-0 ">
            <SideBarName />
          </MDBCol>
          <MDBCol md="6" lg="7" xl="8" className='scroll'>
            {activeInChatBox.status === 'online' ? <ChatBox /> : ''}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default page

