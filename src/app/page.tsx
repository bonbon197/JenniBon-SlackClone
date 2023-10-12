'use client';
import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link"
import { MDBBtn } from 'mdb-react-ui-kit';



export default function Home() {
  return (
  
    <div className="text-center m-5">
      <a href='/login' className=''>
        <MDBBtn color='dark'>
          Start
        </MDBBtn>
      </a>
    </div>
   
  
  )
}
