'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { getUsers } from '../../utils/APILayer'
import { getMessages } from '../../utils/APILayer'
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

const sidebar = () => {
  const headers = JSON.parse(localStorage.getItem('loginUser'));
  // const activeChat = JSON.parse(localStorage.getItem('activeInChatBox'));
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
        // console.log(res.data);
      })
    }
  }
  callGetusers();

  const [chatEmails, setChatEmails] = useState([])
  const [existChat, setExistChat] = useState(false);

  if (usersList) {
    let u = 0;
    // let loopDone = true;
    while(usersList[u] < usersList.length  ){
      console.log(usersList[u])
      u++;
    }
    // console.log(userList[u]);
  
    // for (let u = 0; u < usersList.length; u++) {
    //   if (usersList[u]) {
    //     const loopUser = {
    //       receiver_id: usersList[u].id,
    //       receiver_email: usersList[u].email,
    //       receiver_class: "User",
    //       access_token: headers.access_token,
    //       client: headers.client,
    //       expiry: headers.expiry,
    //       uid: headers.uid
    //     }

    //     const getMessRes = getMessages(loopUser)
    //     getMessRes.then(res => {
    //       // console.log(res.data)
    //       if (res.data.length > 0 && res.data && res.data !== 'undefined') {
    //         //     console.log(res.data)
    //         if (res.data[0].receiver.email !== headers.email) {
    //           console.log(res.data[0].receiver.email)
    //           setExistChat(true)
    //           chatEmails.push(res.data);
    //         }
    //         if (res.data[0].sender.email !== headers.email) {
    //           console.log(res.data[0].sender.email)
    //           chatEmails.push(res.data);
    //           setExistChat(true)
    //         }
    //       }
    //     }).catch(err => {
    //       console.log('err');
    //       console.log(err);
    //     })

    //   }

    // }
  }

  let displayEmail;
  // if(existChat){

  //   console.log(chatEmails)
  //   console.log(existChat)
  // displayEmail = <div>
  //   {

  //     existChat.map((x,i)=>{
  //       // console.log(headers.email)
  //       // console.log(x.sender.email)
  //     if(x.sender.email !== headers.email){
  //       return(
  //         <li className="p-2 border-bottom" key={i}>
  //                 <a
  //                   href="#!"
  //                   className="d-flex justify-content-between link-light"
  //                 >
  //                   <div className="d-flex flex-row">
  //                     <img
  //                       src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
  //                       alt="avatar"
  //                       className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
  //                       width="60"
  //                     />
  //                     <div className="pt-1">
  //                       <p className="fw-bold mb-0">{x.sender.email}</p>
  //                       <p className="small text-white">
  //                         Lorem ipsum dolor sit.
  //                       </p>
  //                     </div>
  //                   </div>
  //                   <div className="pt-1">
  //                     <p className="small text-white mb-1">{x.created_at}</p>
  //                   </div>
  //                 </a>
  //               </li>
  //     )
  //     }else if(x.receiver.email !== headers.email){
  //       return(
  //         <li className="p-2 border-bottom" key={i}>
  //                 <a
  //                   href="#!"
  //                   className="d-flex justify-content-between link-light"
  //                 >
  //                   <div className="d-flex flex-row">
  //                     <img
  //                       src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
  //                       alt="avatar"
  //                       className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
  //                       width="60"
  //                     />
  //                     <div className="pt-1">
  //                       <p className="fw-bold mb-0">{x.receiver.email}</p>
  //                       <p className="small text-white">
  //                       {x.body}
  //                       </p>
  //                     </div>
  //                   </div>
  //                   <div className="pt-1">
  //                     <p className="small text-white mb-1">{x.created_at}</p>
  //                   </div>
  //                 </a>
  //               </li>
  //     )

  //     }
  //   })
  // }
  // </div>

  // }


  return (
    <>
      <MDBCard className="mask-custom">
        <MDBCardBody>
          <MDBTypography listUnStyled className="mb-0">
            <li className="p-2 border-bottom">
              <a
                href="#!"
                className="d-flex justify-content-between link-light"
              >
                <div className="d-flex flex-row">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                    width="60"
                  />
                  <div className="pt-1">
                    <p className="fw-bold mb-0">Kate Moss</p>
                    <p className="small text-white">
                      Lorem ipsum dolor sit.
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="small text-white mb-1">Yesterday</p>
                </div>
              </a>
            </li>
            {displayEmail ? displayEmail : ''}

          </MDBTypography>
        </MDBCardBody>
      </MDBCard>
    </>
  )
}

export default sidebar
