'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { getDB } from '@/db/DBLayer';
import ChatBox from '../components/ChatBox';
import SideBarName from '../components/SideBarName';
import HeaderMenu from '../components/HeaderMenu';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const page = () => {
  const { session: headers, session: getActiveInChatBox } = getDB();  
  const [activeInChatBox, setActiveInChatBox] = useState(getActiveInChatBox)


  // console.log(activeInChatBox.status);

  return (
    <>
      <HeaderMenu />
      <MDBContainer fluid className="py-5 gradient-custom mainBody">
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
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

