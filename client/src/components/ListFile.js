import { TableBody, TableCell, TableRow } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GridOnIcon from '@mui/icons-material/GridOn';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ReactTimeAgo from 'react-time-ago'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { url } from '../BaseUrl';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Menu, MenuItem } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarIcon from '@mui/icons-material/Star';



export const ListFile = (props) => {
    const context = useContext(AppContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isStar, setIsStar] = useState(false)


    useEffect(() => {
        setIsStar(props.star)
    }, [props.star])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleStar = () => {
        axios.put(`${url}/ff/starhandle`, {
            uid: context.auth.uid,
            fileid: props.id
        })
            .then(function (response) {
                console.log(response);
                setIsStar(!isStar)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDetele = () => {
        axios.put(`${url}/ff/trashhandle`, {
            uid: context.auth.uid,
            fileid: props.id
        })
            .then(function (response) {
                console.log(response);
                props.handleRemoveFileCard(props.id)
                // ref.current.style.display = 'none';
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <TableBody>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <a href={`${props.link}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', height: 'inherit' }}><TableCell component="th" scope="row" style={{ fontSize: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {
                        (props.type === 'image/png' || props.type === 'image/jpeg' || props.type === 'image/jpg') ?
                            <ImageIcon style={{ width: '20px', marginLeft: '9px' }} /> : <>
                            </>
                    }
                    {
                        (props.type === 'application/pdf') ?
                            <PictureAsPdfIcon style={{ width: '20px', marginLeft: '9px', color: 'red' }} /> : <></>

                    }
                    {
                        (props.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ?
                            <GridOnIcon style={{ width: '20px', marginLeft: '9px', color: 'green' }} /> : <></>

                    }
                    {
                        (props.type === 'video/x-matroska' || props.type === 'video/mp4' || props.type === 'video/3gp') ?
                            <MovieCreationIcon style={{ width: '20px', marginLeft: '9px', color: '#757ce8' }} /> : <></>

                    }
                    {
                        (props.type !== 'video/x-matroska' && props.type !== 'video/mp4' && props.type !== 'video/3gp' && props.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && props.type !== 'application/pdf' && props.type !== 'image/png' && props.type !== 'image/jpeg' && props.type !== 'image/jpg') ?
                            <InsertDriveFileIcon style={{ width: '20px', marginLeft: '9px' }} /> : <></>
                    }
                    <p style={{ marginLeft: '9px' }}>{props.name}</p>
                </TableCell>
                </a>
                <TableCell align="right" style={{ fontSize: '12px' }}><ReactTimeAgo date={Date.parse(props.timstamp)} locale="en-US" /></TableCell>
                <TableCell align="right" style={{ fontSize: '12px' }}>
                    
                    {
                        (props.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ?
                            "application/xls" : <>{props.type}</>

                    }

                </TableCell>
                <TableCell align="right" style={{ fontSize: '12px' }}><MoreVertIcon onClick={handleClick} style={{ width: '20px', fontSize: '15px', marginBottom: '-6px', cursor: 'pointer' }} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleStar} sx={{ fontFamily: 'Roboto Flex' }} >{!isStar ? <StarBorderIcon sx={{ width: '20px', height: '19px', fontSize: '14px', marginRight: '6px' }} /> : <StarIcon sx={{ width: '20px', height: '19px', fontSize: '14px', marginRight: '6px', color: '#ffcd3c' }} />}<p>{isStar ? "Unstar" : "Star"}</p></MenuItem>
                        <MenuItem onClick={handleDetele} sx={{ fontFamily: 'Roboto Flex', }}><DeleteOutlineIcon sx={{ width: '20px', height: '19px', marginRight: '6px', color: 'red' }} /><p>Remove</p></MenuItem>
                    </Menu>
                </TableCell>

            </TableRow>
        </TableBody >
    )
}