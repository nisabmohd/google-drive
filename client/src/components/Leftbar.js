import React from 'react'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import '../css/leftbar.css'
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export const Leftbar = () => {
    return (
        <div className='leftbar' style={{width:'13%'}}>
            <button style={{width:'45%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#F0F5FF',outline:'none',border:'none',height:'39px',borderRadius:'32px',marginLeft:'22px',cursor:'pointer',marginBottom:'7px',marginTop:'15px'}}><AddIcon style={{marginRight:'6px',marginLeft:'-9px'}}/>New</button>
            <Link to="/" className="tags" style={{marginLeft:'22px',display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'7px',marginTop:'7px',textDecoration:'none',height:'39px',paddingLeft:'9px',borderRadius:'7px 25px 25px 7px'}}>
                <AddToDriveOutlinedIcon style={{width:'19px',height:'19px',marginRight:'15px'}}/>
                <h5>My Drive</h5>
            </Link>
            <Link to="/recent" className="tags" style={{marginLeft:'22px',display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'7px',marginTop:'7px',textDecoration:'none',height:'39px',paddingLeft:'9px',borderRadius:'7px 25px 25px 7px'}}>
                <AccessTimeOutlinedIcon style={{width:'19px',height:'19px',marginRight:'15px'}}/>
                <h5>Recent</h5>
            </Link>
            <Link to="/starred" className="tags" style={{marginLeft:'22px',display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'7px',marginTop:'7px',textDecoration:'none',height:'39px',paddingLeft:'9px',borderRadius:'7px 25px 25px 7px'}}>
                <StarBorderPurple500OutlinedIcon style={{width:'19px',height:'19px',marginRight:'15px'}}/>
                <h5>Starred</h5>
            </Link>
            <Link to="/trash" className="tags" style={{marginLeft:'22px',display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'7px',marginTop:'7px',textDecoration:'none',height:'39px',paddingLeft:'9px',borderRadius:'7px 25px 25px 7px'}}>
                <DeleteOutlinedIcon style={{width:'19px',height:'19px',marginRight:'15px'}}/>
                <h5>Trash</h5>
            </Link>
        </div>
    )
}
