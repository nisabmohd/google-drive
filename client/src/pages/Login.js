import React, { useContext } from 'react'
import { UnloggedNav } from '../components/UnloggedNav'
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from '../firebase'
import drive from '../assets/drive-bg-1.png'
import { url } from '../BaseUrl';
import axios from 'axios'
import { AppContext } from '../App';

export const Login = (props) => {
    const context = useContext(AppContext)
    const auth = getAuth();
    const loginfunc = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                axios.post(`${url}/user/auth`, {
                    uid: result.user.uid
                }).then(function (response) {
                    localStorage.setItem('mainFolder', response.data.mainFolder)
                    context.setMainFolder(response.data.mainFolder)
                })
                    .catch(function (error) {
                        console.log(error);
                    });
                props.setAuth(result.user);
                localStorage.setItem('authuser', JSON.stringify(result.user))
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='login'>
            <UnloggedNav />
            <div className="pagel" >
                <div className="leftpl" style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="somebigtext" style={{ width: '60%' }}>
                        <p className='smallpara' style={{ marginBottom: '16px',fontSize:'30px'  }}> Easy and secure access to all of your content</p>
                        <p style={{ marginBottom: '16px',fontSize:'17px' }}>Store, share, and collaborate on files and folders from any mobile device, tablet, or computer</p>
                        <button onClick={loginfunc} style={{ width: '105px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: context.dark ? "rgba(255, 255, 255, 0.5)" : '#F0F5FF', outline: 'none', border: 'none', height: '45px', borderRadius: '32px', cursor: 'pointer', marginBottom: '17px', marginTop: '15px', color: 'inherit' }}><p style={{fontSize:'14px'}}>Login</p></button>
                        {/* <Button onClick={loginfunc} variant="contained" style={{ textTransform: 'lowercase', width: '195px', height: '42px', fontFamily: 'Comic Neue', color: 'white', fontSize: '15px', backgroundColor: '#2196f3' }}>Login</Button> */}
                    </div>
                </div>
                <div className="rightpl" style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ width: '80%', }} src={drive} alt="" />
                </div>
            </div>
        </div>
    )
}
