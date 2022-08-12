import React, { useContext, useState } from 'react'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import '../css/leftbar.css'
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, TextField } from '@mui/material';
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
        <div className='leftbar' style={{ width: '13%' }}>
            <button onClick={handleClick} style={{ width: '45%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.12)', outline: 'none', border: 'none', height: '39px', borderRadius: '32px', marginLeft: '22px', cursor: 'pointer', marginBottom: '7px', marginTop: '15px', color: 'inherit' }}><AddIcon style={{ marginRight: '6px', marginLeft: '-9px' }} /><h4>New</h4></button>
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

                ><CreateNewFolderIcon style={{ width: '19px', height: '19px', marginRight: '15px' }} /><h5>New Folder</h5></MenuItem>
                <input type="file" id="fileup" onChange={(e)=>{e.preventDefault();handleUpdate(e)}} hidden />
                <label htmlFor="fileup">
                    <MenuItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontFamily: 'Comic Neue' }} >
                        <UploadFileIcon style={{ width: '19px', height: '19px', marginRight: '15px' }} /><h5>File Upload</h5>
                    </MenuItem>
                </label>
            </Menu>
            <Dialog fullWidth open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{ fontFamily: 'Comic Neue' }}><h5 style={{ fontFamily: 'Comic Neue' }}>New Folder</h5></DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        InputProps={{ style: { fontSize: 13.9, fontFamily: 'Comic Neue', fontWeight: 'bold' } }}
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
                    <Button sx={{ fontFamily: 'Comic Neue' }} onClick={handleCloseDialog}><h5>Cancel</h5></Button>
                    <Button sx={{ fontFamily: 'Comic Neue' }} onClick={fileCreateHandle}><h5>Create</h5></Button>
                </DialogActions>
            </Dialog>
            <Link to="/mydrive" className="tags" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '39px', paddingLeft: '9px', borderRadius: '7px 25px 25px 7px', textDecorationColor: 'none', color: 'inherit' }}>
                <AddToDriveOutlinedIcon style={{ width: '19px', height: '19px', marginRight: '15px' }} />
                <h5>My Drive</h5>
            </Link>
            <Link to="/recent" className="tags" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '39px', paddingLeft: '9px', borderRadius: '7px 25px 25px 7px', textDecorationColor: 'none', color: 'inherit' }}>
                <AccessTimeOutlinedIcon style={{ width: '19px', height: '19px', marginRight: '15px' }} />
                <h5>Recent</h5>
            </Link>
            <Link to="/starred" className="tags" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '39px', paddingLeft: '9px', borderRadius: '7px 25px 25px 7px', textDecorationColor: 'none', color: 'inherit' }}>
                <StarBorderPurple500OutlinedIcon style={{ width: '19px', height: '19px', marginRight: '15px' }} />
                <h5>Starred</h5>
            </Link>
            <Link to="/trash" className="tags" style={{ marginLeft: '22px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '7px', marginTop: '7px', textDecoration: 'none', height: '39px', paddingLeft: '9px', borderRadius: '7px 25px 25px 7px', textDecorationColor: 'none', color: 'inherit' }}>
                <DeleteOutlinedIcon style={{ width: '19px', height: '19px', marginRight: '15px' }} />
                <h5>Trash</h5>
            </Link>
        </div>
    )
}
