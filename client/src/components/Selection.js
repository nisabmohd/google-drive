import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export const Selection = () => {
  return (
    <div className='selection' style={{backgroundColor:'white',width:"100%",height:'59px',display:'flex',flexDirection:'row',alignItems:'center',borderBottom:'1.5px solid #E7E7ED',marginBottom:'19px'}}>My Drive <ArrowDropDownIcon style={{width:'22px',height:'22px',marginLeft:'6px'}} /> <FormatListBulletedIcon style={{marginLeft:'auto',marginRight:'19px',width:'20px',height:'22px',cursor:'pointer'}} /></div>
  )
}
