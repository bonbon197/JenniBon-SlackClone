'use client'
import React from 'react'
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
  return (
    <>
        <MDBCard className="mask-custom">
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                <li
                  className="p-2 border-bottom"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,.3) !important",
                  }}
                >
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">John Doe</p>
                        <p className="small text-white">
                          Hello, Are you there?
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small mb-1 text-white">Just now</p>
                      <span className="badge bg-danger float-end">1</span>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Danny Smith</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-whites mb-1">5 mins ago</p>
                    </div>
                  </a>
                </li>
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Alex Steward</p>
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
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Ashley Olsen</p>
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
                <li className="p-2 border-bottom">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Lara Croft</p>
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
                <li className="p-2">
                  <a
                    href="#!"
                    className="d-flex justify-content-between link-light"
                  >
                    <div className="d-flex flex-row">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="60"
                      />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">Brad Pitt</p>
                        <p className="small text-white">
                          Lorem ipsum dolor sit.
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-white mb-1">5 mins ago</p>
                      <span className="text-white float-end">
                        <MDBIcon fas icon="check" />
                      </span>
                    </div>
                  </a>
                </li>
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
    </>
  )
}

export default sidebar
