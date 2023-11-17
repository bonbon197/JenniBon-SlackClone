'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { getUsers } from '../../utils/APILayer'
import { getMessages } from '../../utils/APILayer'
import { getChannels } from '../../utils/APILayer'
import { getChannelDetails } from '../../utils/APILayer'
import { addMember } from '../../utils/APILayer'
import Date from '../components/Date.js';
import Spinner from 'react-bootstrap/Spinner';
import '../css/main.css'
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
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput
} from "mdb-react-ui-kit";
const activeChat = JSON.parse(localStorage.getItem('activeInChatBox'));

const sidebar = () => {
  const [fillActive, setFillActive] = useState(()=>{
    return activeChat.receiver_class ? activeChat.receiver_class:'User'
  });

  const handleFillClick = (value: string) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  };

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
        console.log(res.data)
        setRunOnceGetUsers(true);
      })
    }
  }
  callGetusers();

  const [chatEmails, setChatEmails] = useState([])
  const [existChat, setExistChat] = useState(false);

  const [channelList, setChannelList] = useState([]);
  const [channelHeader, setChannelHeader] = useState([]);
  const [channelMem, setChannelMem] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [runGetChannel, setRunGetChannel] = useState(false);
  const getChannel = () => {
    if (!runGetChannel) {
      const resGetChannel = getChannels(userData)
      resGetChannel.then(res => {
        setChannelList(res.data);
        setRunGetChannel(true);

      })
    }
  }
  getChannel();

  const [ShowChannelViewModal, setShowChannelViewModal] = useState(false);
  const [channelDetails, setChannelDetails] = useState([]);
  const [runOncechannel, setrunOncechannel] = useState(false)
  const [membersWithemail, setMembersWithemail] = useState([]);
  // console.log(usersList);
  const toggleChannelViewShow = (e: { target: { id: any } }) => {
    setrunOncechannel(false);
    setMembersWithemail([])
    // setChannelDetails([])
    const ChanneldetailsParam = {
      access_token: headers.access_token,
      client: headers.client,
      expiry: headers.expiry,
      uid: headers.uid,
      channel_id: e.target.id
    }
    //  console.log(e.target.id);
    if (!runOncechannel && usersList.length > 0) {
      console.log('usersList.length');
      const response = getChannelDetails(ChanneldetailsParam)
      response.then(res => {
        const memberIds = res.data.channel_members;
        console.log(usersList.length);

        for (let i = 0; i < usersList.length; i++) {
          for (let x = 0; x < memberIds.length; x++) {
            if (usersList[i].id == memberIds[x].user_id) {
              console.log(usersList[i].email);
              membersWithemail.push(usersList[i].email)
            }
          }
        }
        setrunOncechannel(true)
        setChannelDetails(membersWithemail);

      })
    }
    setShowChannelViewModal(!ShowChannelViewModal);
    setChannelDetails([])

  }

  // console.log(channelDetails)
  let displayChannelDetails;
  if (channelDetails) {
    displayChannelDetails = <div>
      {
        channelDetails.map((x, i) => {
          return (
            <MDBListGroup style={{ minWidthL: '22rem' }} light key={i}>
              <MDBListGroupItem>{x}</MDBListGroupItem>
            </MDBListGroup>
          )
        })
      }
    </div>
  }

  let loadingTrue;
  const loading = () => {
    loadingTrue = <div>{
      <Spinner animation="border" role="status" className='text-dark'>
        <span className="visually-hidden text-dark">Loading...</span>
      </Spinner>
    }
    </div>
  }
  loading()



  const [memberEmail, setMemberEmail] = useState('')
  const [channelID, setChannelID] = useState('')
  const [ShowChannelAddModal, setShowChannelAddModal] = useState(false);

  let emailExist: boolean;
  const showAddMemberModal = (e) => {
    setChannelID(e.target.id)
    setShowChannelAddModal(true)
  }

  const handleAddMember = () => {

    if (usersList) {
      for (let u = 0; u < usersList.length; u++) {
        if (usersList[u].email === memberEmail) {
          emailExist =true;

          const AddMemberData = {
            access_token: headers.access_token,
            client: headers.client,
            expiry: headers.expiry,
            uid: headers.uid,
            channel_id: channelID,
            member_id: usersList[u].id
          }
    
          const response = addMember(AddMemberData)
          response.then(res => {
            console.log(res)
            if (res.errors) {
              alert(res.errors[0]);
            } else {
              setMemberEmail('')
              setShowChannelAddModal(false)
            }
          })

          
        }
      }
    }

    if(!emailExist){
      alert('Please check input email');
    }
    
  }







  let displayChannelName;
  const displayCreatedChannel = () => {

    if (channelList) {
      displayChannelName = <div>
        {
          channelList.map((x, i) => {
            return (

              <li className="p-2 border-bottom" key={i}>
                <a
                  href="#!"
                  className="d-flex justify-content-between link-light"
                >
                  <div className="d-flex flex-row">

                    <div className="pt-1">
                      <button onClick={(e) =>{
                        console.log(x.id)
                        const activeInChatBox = {
                              status: 'online',
                              receiver_id:x.id,
                              receiver_class: "Channel",
                              class_name:x.name,
                              access_token: headers.access_token,
                              client: headers.client,
                              expiry: headers.expiry,
                              uid: headers.uid,
                              channel_id:x.id
                            }
                            localStorage.setItem('activeInChatBox', JSON.stringify(activeInChatBox));
                            location.reload();

                        }} >
                      <p className="fw-bold mb-0 channelListname">{x.name}</p>
                      </button>
                    </div>
                  </div>
                  <div className="pt-1">
                    <p className="small text-white mb-1"><Date dateString={x.created_at} /></p>
                  </div>
                </a>
                <div className="pt-1">
                  <p className="small text-white mb-1">
                    <MDBBtn className='text-dark m-1' color='light' id={x.id} value={x} onClick={toggleChannelViewShow}>members</MDBBtn>
                    <MDBBtn className='text-dark m-1' color='light' id={x.id} onClick={showAddMemberModal}>Add</MDBBtn>
                  </p>
                </div>
              </li>
            )
          })
        }
      </div>
    }

  }

  displayCreatedChannel();



  return (
    <>
      <div className='sidebarContainer'>

      
      <MDBTabs fill className='mb-3'>
        <MDBTabsItem className=" " >
          <MDBTabsLink className="sidebarTab" onClick={() => handleFillClick('User')} active={fillActive === 'User'}>
            DM
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className=" " >
          <MDBTabsLink className="sidebarTab" onClick={() => handleFillClick('Channel')} active={fillActive === 'Channel'}>
            Channel
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
            <MDBTabsPane show={fillActive === 'User'}>
              {[...Array(4)].map((_, i) => (
                <MDBCard key={i} className="mask-custom scroll">
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
                    </MDBTypography>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBTabsPane>

        <MDBTabsPane show={fillActive === 'Channel'}>
          <MDBCard className="mask-custom scroll scrollcss">
            <MDBCardBody >
              <MDBTypography listUnStyled className="mb-0 text-dark">
                {displayChannelName}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBTabsPane>
      </MDBTabsContent>




      {/* <MDBModal show={ShowChannelViewModal} setShow={setShowChannelViewModal} tabIndex='-1'> */}
      <MDBModal show={ShowChannelViewModal} setShow={setShowChannelViewModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className='text-dark'>Channel members</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => setShowChannelViewModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='text-dark'>
              {channelDetails.length > 0 ? displayChannelDetails : loadingTrue}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShowChannelViewModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal show={ShowChannelAddModal} setShow={setShowChannelAddModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add New Member</MDBModalTitle>

            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label="Add New Member Email" id="newMember" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} required />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => setShowChannelAddModal(false)}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleAddMember}>Add</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </div>

    </>
  )
}


export default sidebar