'use client'
import React from 'react'
import Link from "next/link"
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

const Header = () => {
  return (
    <>
        <a href='/login'>
            <span className="font-weight-bold text-center text-white m-5">
            Logout
            </span>
        </a>
        <a href='/'>
          <span className="font-weight-bold mb-3 text-center text-white">
            New Message
          </span>
        </a>
    </>
  )
}

export default Header
