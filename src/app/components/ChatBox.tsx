'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import { sendMessage } from '../../utils/APILayer'
import { getUsers } from '../../utils/APILayer'
import { getMessages } from '../../utils/APILayer'
import { getDB } from '../../db/DBLayer'
import '../components/chatbox.css';
import Date from '../components/Date.js';
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
import { getEventListeners } from 'events';
import { createLocalPrivateMessagesHistory } from '@/utils/CreateLocal';


const chatbox = () => {
  const [message, setMessage] = useState('');
  const { session: headers, session: activeChat } = getDB();
  const [email, setEmail] = useState(activeChat.receiver_email);

  const [smUserData, setSMUserData] = useState({
    receiver_id: activeChat.receiver_id,
    receiver_email: activeChat.receiver_email,
    receiver_class: "User",
    access_token: headers.access_token,
    client: headers.client,
    expiry: headers.expiry,
    uid: headers.uid
  });
  let getID = '';
  let emailExist = false;
  if (activeChat) {
    getID = activeChat.receiver_id;
    emailExist = true;
  }

  //this only sends messages to users
  const handleSendMess = () => {
    if (emailExist) {
      const SendMessUserData = {
        receiver_id: getID,
        receiver_class: "User",
        body: message,
        access_token: headers.access_token,
        client: headers.client,
        expiry: headers.expiry,
        uid: headers.uid
      }
      createLocalPrivateMessagesHistory(SendMessUserData);
      const response = sendMessage(SendMessUserData);
      console.log(response);
      response.then(res => {
        console.log(res.data);
        const saveUpdatedChat = {
          id: res.data.id,
          body: res.data.body,
          created_at: res.data.created_at,
          sender: {
            email: headers.uid,
            id: headers.user_id
          },
          receiver: {
            id: getID,
            email: activeChat.receiver_email
          }
        }
        dataMesasage.push(saveUpdatedChat);
        setMessage('');
      })

      setRunOnce(false);
      callMessage();
    }
  }

  const [dataMesasage, setDataMesasage] = useState([]);
  const [runOnce, setRunOnce] = useState(false);
  let displaymessages = null;
  const callGetMessage = () => {
    if (!runOnce) {
      const getMessRes = getMessages(smUserData)
      getMessRes.then(GMres => {
        setDataMesasage(GMres.data);
        setRunOnce(true);
        return GMres.data;
      });
    }
  }
  callGetMessage();
  const callMessage = () => {
    if (dataMesasage) {
      displaymessages = <div>
        {
          dataMesasage.map((x, i) => {
            // console.log(headers.email)
            // console.log(x.sender.email)
            if (x.sender.email === headers.email) {
              return (
                <li className="d-flex justify-content-end mb-4" key={i}>
                  <MDBCard className="mask-custom">
                    <MDBCardHeader
                      className="d-flex justify-content-between p-2"
                      style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                    >
                      <p className="text-light small mb-0">
                        <MDBIcon far icon="clock" /> <Date dateString={x.created_at} />
                      </p>
                      <p className="mb-0">{x.sender.email}</p>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">
                        {x.body}
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
              )
            } else {
              return (
                <li className="d-flex justify-content-start mb-4" key={i}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-end me-3 shadow-1-strong"
                    width="60"
                  />
                  <MDBCard className="mask-custom">
                    <MDBCardHeader
                      className="d-flex justify-content-between p-2"
                      style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
                    >
                      <p className="mb-0">{x.sender.email}</p>
                      <p className="text-light small mb-0">
                        <MDBIcon far icon="clock" /> <Date dateString={x.created_at} />
                      </p>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">
                        {x.body}
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                </li>
              )
            }
          })
        }
      </div>
    }
  }
  callMessage();

  return (
    <>

      <MDBTypography listUnStyled className="text-white " >
        <li className="d-flex flex-row align-items-center mb-2 justify-content-center">
          <h5>{email}</h5>
        </li>
        <div className='chatBoxContainer'>
          <li className="d-flex flex-row align-items-center justify-content-center mb-4">
            <MDBIcon fas icon="envelope me-3" size='lg' />
          </li>
          {displaymessages}
        </div>
        <li className="mb-2">
          <MDBTextArea label="Message" value={message} id="textAreaExample" rows={2} onChange={(e) => setMessage(e.target.value)} />
        </li>
        <MDBBtn color="light" size="lg" rounded className="float-end" onClick={handleSendMess}>
          Send
        </MDBBtn>
      </MDBTypography>
    </>
  )
}

export default chatbox
