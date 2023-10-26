import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/APILayer';
// import { getDB, setDB } from '@/db/DBLayer';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { createLocalSession } from '@/utils/CreateLocal';

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await loginUser({ email, password });

      if (response.data.success === false) {
        alert(response.data.errors[0]);
      } else {
        createLocalSession(response.headers);
        router.push('/main');
      }
    } catch (err) {
      console.error(err);
      alert('Please contact your system provider!');
    }
  };
  
    // const activeInChatBox = {
    //   status: 'offline',
    //   receiver_id: '',
    //   receiver_email: '',
    //   receiver_class: 'User',
    //   access_token: saveUser.access_token,
    //   client: saveUser.client,
    //   expiry: saveUser.expiry,
    //   uid: saveUser.uid,
    // };
  
    // const activeInChatBoxDB = getDB();
    // activeInChatBoxDB.activeInChatBox = activeInChatBox;
    // setDB(activeInChatBoxDB);
  
    

  

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <div className="text-center">
        <h5>SIGN IN</h5>
      </div>
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="text-center">
        <MDBBtn color="dark" className="mb-4" size="lg" onClick={handleSignIn}>
          Sign in
        </MDBBtn>
        <p>
          No account yet? <Link href="/signup">Register</Link>
        </p>
      </div>
    </MDBContainer>
  );
};

export default page;
