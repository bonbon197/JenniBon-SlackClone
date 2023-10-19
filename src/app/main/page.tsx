'use client' ;
import React from 'react'
import ChatBox from '../components/ChatBox';
import SideBarName from '../components/SideBarName';
import HeaderMenu from '../components/HeaderMenu';
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
} from "mdb-react-ui-kit";

const page = () => {

  
  
  
  return (
    <>
      <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          
        <HeaderMenu />
        <SideBarName />
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
        <ChatBox />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  )
}

export default page







































// import React from 'react'
// import ChatBox from '../components/ChatBox';
// import SideBar from '../components/SideBar';
// // import Header from '../components/Header';

// const page = () => {
//   return (
//     <>

//       <ChatBox />
//       {/* <SideBar /> */}
//     </>
//   )
// }

// export default page
