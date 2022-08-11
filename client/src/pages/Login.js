import { Box, Button } from '@mui/material'
import React from 'react'
import { UnloggedNav } from '../components/UnloggedNav'
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from '../config'
import toast, { Toaster } from 'react-hot-toast';
import drive from '../assets/drive.svg'

export const Login = (props) => {
    const auth = getAuth();
    const loginfunc = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                props.setAuth(result.user);
                localStorage.setItem('authuser', JSON.stringify(result.user))
            }).catch((error) => {
                toast.error('error!');
            });
    }
    return (
        <div className='login'>
            <Toaster />
            <UnloggedNav />
            <Box className="page" style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="left" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="somebigtext" style={{ width: '60%' }}>
                        <h1 style={{ marginBottom: '16px' }}> Easy and secure access to all of your content</h1>
                        <p style={{ marginBottom: '16px' }}>Store, share, and collaborate on files and folders from any mobile device, tablet, or computer</p>
                        <Button onClick={loginfunc} variant="contained" style={{ textTransform: 'lowercase', width: '195px', height: '42px',fontFamily:'Comic Neue',color:'white',fontSize:'15px' }}>Login</Button>
                    </div>
                </div>
                <div className="right" style={{ width: '50%' }}>
                    <img style={{ width: '85%', }} src={drive} alt="" />
                </div>
            </Box>
        </div>
    )
}
