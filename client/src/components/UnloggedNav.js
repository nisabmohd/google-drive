import React from 'react'
import logo from '../assets/logo.png'
export const UnloggedNav = () => {
    return (
        <div className='navbar' style={{ width: '100%', display: "flex", flexDirection: 'row', alignItems: 'center', height: '72' }}>
            <div className="left" style={{ width: '24%', }}>
                <div className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '19px', marginBottom: '19px', cursor: 'pointer' }}>
                    <img style={{ width: '25px', marginLeft: '9%', marginRight: '8.45px' }} src={logo} alt="" />
                    <p style={{fontSize:'17px'}}>Drive</p>
                </div>
            </div>
        </div>
    )
}
