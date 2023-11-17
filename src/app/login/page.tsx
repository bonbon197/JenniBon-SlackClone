'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/utils/APILayer';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { createLocalSession } from '@/utils/CreateLocal';

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSignIn = async () => {
        try {
            const response = await loginUser(formData);

            if (response.data.success === false) {
                console.error(response.data.errors[0]);
            } else {
                createLocalSession(response.headers);
                router.push('/main');
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                name="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

export default LoginPage;
