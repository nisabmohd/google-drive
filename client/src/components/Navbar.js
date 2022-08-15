import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import Avatar from '@mui/material/Avatar';
// import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, LinearProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppContext } from '../App';
import '../css/Navbar.css'
import { useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
    const context = useContext(AppContext)    
    const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [search, setSearch] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const sr=()=>{
        if(!search) return
        navigate(`/search?q=${search}`)
    }

    return (<>
        <Box className='navbar' sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ width: '100%', display: "flex", flexDirection: 'row', alignItems: 'center', height: '72', }}>

            <div className="left" style={{ width: '24%'}}>
                <div className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '19px', marginBottom: '19px', cursor: 'pointer' }}>
                    <img style={{ width: '25px', marginLeft: '9%', marginRight: '8.45px' }} src={logo} alt="" />
                    <p className='hidelogo' style={{ fontSize: '17px' }}>Drive</p>
                </div>
            </div>
            <div className="right" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                <Box className="searchbar" style={{ width: '838px', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '42px', borderRadius: '17px', color: 'inherit', backgroundColor: context.dark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.04)' }}>
                    <input placeholder='Seach Drive' type="text" className={context.dark ? 'indark' : ''} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', width: '93.8%', height: 'inherit', paddingLeft: '18px', color: 'inherit', marginLeft: '1%', fontSize: '12px', fontWeight: 'unset' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                    <SearchIcon onClick={()=>sr()} style={{ width: '20px', height: '18px', cursor: 'pointer' }}></SearchIcon>
                </Box>
                <div className="user_settings" style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '11px' }}>
                    {/* <AppsIcon color="primary" style={{ width: '24px', height: '24px', marginLeft: '12px', marginRight: "9px", cursor: 'pointer' }}></AppsIcon> */}
                    <Avatar src={props.photo} onClick={handleClick} style={{ width: '29px', height: '30px', marginLeft: '12px', marginRight: "9px", cursor: 'pointer' }} />
                    <Menu
                        disableAutoFocusItem={false}
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 25,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => props.handleDark()} sx={{ fontFamily: 'Roboto Flex' }} ><Brightness4Icon sx={{ width: '20px', height: '19px', fontSize: '14px', marginRight: '6px' }} /><p>Toggle Dark</p></MenuItem>
                        <MenuItem sx={{ fontFamily: 'Roboto Flex', fontSize: '13px' }} onClick={() => { props.setAuth(null); localStorage.removeItem('authuser') }}><LogoutIcon sx={{ width: '20px', height: '19px', marginRight: '6px' }} /><p>Logout</p></MenuItem>

                    </Menu>
                </div>
            </div>
        </Box>
        {
            props.loading ? <><LinearProgress sx={{ height: '1.9px' }} /></> : <></>
        }
    </>
    )
}
