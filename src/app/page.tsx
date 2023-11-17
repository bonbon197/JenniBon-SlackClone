'use client';

import styles from './page.module.css';
import Image from 'next/image';
import { MDBBtn } from 'mdb-react-ui-kit';
import Link from 'next/link';
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
                session: {},
            });
        }
    }, []);


    return (
        <div className="text-center m-5">
            <Link href="/login">
                
                    <MDBBtn color="dark">Start</MDBBtn>
                
            </Link>
        </div>
    );
}
