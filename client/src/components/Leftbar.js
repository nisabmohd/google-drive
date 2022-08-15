import React, { useContext, useState } from 'react'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import '../css/leftbar.css'
import { NavLink } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, TextField } from '@mui/material';
import { AppContext } from '../App'

export const Leftbar = () => {
    const context = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [filenameinput, setFilenameinput] = useState(`New Folder ${Math.floor(Math.random() * 100)}`)
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    function fileCreateHandle() {
        context.newFolderCreate(filenameinput)
        setFilenameinput(`New Folder ${Math.floor(Math.random() * 100)}`)
        setOpenDialog(false);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdate = (e) => {
        context.fileUpload(e.target.files[0])
        handleClose()
    }
    return (
        <div className='leftbar'>
            <button onClick={handleClick} style={{ width: '45%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: context.dark ? "rgba(255, 255, 255, 0.5)" : '#F0F5FF', outline: 'none', border: 'none', height: '39px', borderRadius: '32px', marginLeft: '22px', cursor: 'pointer', marginBottom: '17px', marginTop: '15px', color: 'inherit' }}><AddIcon style={{  width: '27px', height: '25px',marginRight: '6px', marginLeft: '-9px' }} />New</button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontFamily: 'Comic Neue' }}
                    onClick={() => { handleClickOpenDialog(); handleClose() }}

                ><CreateNewFolderIcon style={{width: '21px', height: '20px',marginRight: '15px' }} /><p>New Folder</p></MenuItem>
                <input type="file" id="fileup" onChange={(e) => { e.preventDefault(); handleUpdate(e) }} hidden />
                <label htmlFor="fileup">
                    <MenuItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontFamily: 'Comic Neue' }} >
                        <UploadFileIcon style={{ width: '21px', height: '20px',marginRight: '15px' }} /><p>File Upload</p>
                    </MenuItem>
                </label>
            </Menu>
            <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{ fontFamily: 'Roboto Flex' }}><p style={{ fontFamily: 'Roboto Flex' }}>New Folder</p></DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        InputProps={{ style: { fontSize: 13.9, fontFamily: 'Roboto Flex'} }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Folder Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={filenameinput}
                        onChange={(e) => setFilenameinput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>

                    <button onClick={handleCloseDialog} style={{ width: '18%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: context.dark ? "rgba(255, 255, 255, 0.5)" : '#F0F5FF', outline: 'none', border: 'none', height: '39px', borderRadius: '32px', marginLeft: '22px', cursor: 'pointer', marginBottom: '17px', marginTop: '15px', color: 'inherit' }}><p>Cancel</p></button>
                    <button onClick={fileCreateHandle} style={{ width: '18%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: context.dark ? "rgba(255, 255, 255, 0.5)" : '#F0F5FF', outline: 'none', border: 'none', height: '39px', borderRadius: '32px', marginLeft: '22px', cursor: 'pointer', marginBottom: '17px', marginTop: '15px', color: 'inherit', marginRight: '9px' }}><p>Create</p></button>

                    {/* <Button sx={{ fontFamily: 'Comic Neue' }} onClick={handleCloseDialog}><h5>Cancel</h5></Button>
                    <Button sx={{ fontFamily: 'Comic Neue' }} onClick={fileCreateHandle}><h5>Create</h5></Button> */}
                </DialogActions>
            </Dialog>
            <NavLink to="/mydrive"
                className={({ isActive }) =>
                    isActive ? context.dark ? "tagsdark darkactive" : "tags lightactive" : context.dark ? "tagsdark" : "tags"
                }
                style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '35px', paddingLeft: '9px', borderRadius: '3px 25px 25px 3px', textDecorationColor: 'none', color: 'inherit',fontSize:'12.5px' }}>
                <AddToDriveOutlinedIcon style={{ width: '23px', height: '22px', marginRight: '15px' }} />
                My Drive
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? context.dark ? "tagsdark darkactive" : "tags lightactive" : context.dark ? "tagsdark" : "tags"
                }
                to="/recent" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '35px', paddingLeft: '9px', borderRadius: '3px 25px 25px 3px', textDecorationColor: 'none', color: 'inherit',fontSize:'12.5px' }}>
                <AccessTimeOutlinedIcon style={{ width: '23px', height: '22px', marginRight: '15px' }} />
                Recent
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? context.dark ? "tagsdark darkactive" : "tags lightactive" : context.dark ? "tagsdark" : "tags"
                }
                to="/starred" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '35px', paddingLeft: '9px', borderRadius: '3px 25px 25px 3px', textDecorationColor: 'none', color: 'inherit',fontSize:'12.5px' }}>
                <StarBorderPurple500OutlinedIcon style={{ width: '23px', height: '22px', marginRight: '15px' }} />
                Starred
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? context.dark ? "tagsdark darkactive" : "tags lightactive" : context.dark ? "tagsdark" : "tags"
                }
                to="/trash" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '35px', paddingLeft: '9px', borderRadius: '3px 25px 25px 3px', textDecorationColor: 'none', color: 'inherit',fontSize:'13px' }}>
                <DeleteOutlinedIcon style={{ width: '23px', height: '22px', marginRight: '15px',fontSize:'12.5px' }} />
                Trash
            </NavLink>
        </div>
    )
}
