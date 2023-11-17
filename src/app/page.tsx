'use client';
import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link"
import { MDBBtn } from 'mdb-react-ui-kit';
import { getDB, setDB } from '@/db/DBLayer';
import { useEffect } from 'react';
import Login from '../app/login/page.tsx';

export default function Home() {
  
  useEffect(() => {
    const db = getDB();
    if (!db.users) {
      setDB({
        users: [],
        channels: [],
        messages: []
      })
    }
  }, [])

  return (
    // <div className="text-center m-5">
    //   <a href='/login' className=''>
    //     <MDBBtn color='dark'>
    //       Start
    //     </MDBBtn>
    //   </a>
    // </div>
    <>
    <Login />
    </>
   
  
  )
}
