import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box } from '@mui/material';
export const Selection = () => {
  return (
    <Box className='selection' sx={{ borderBottom: 0.5 ,borderColor: 'divider'}}  style={{ width: "100%", height: '59px', display: 'flex', flexDirection: 'row', alignItems: 'center',marginBottom: '19px' }}>My Drive <ArrowDropDownIcon style={{ width: '22px', height: '22px', marginLeft: '6px' }} /> <FormatListBulletedIcon style={{ marginLeft: 'auto', marginRight: '19px', width: '20px', height: '22px', cursor: 'pointer' }} /></Box>
  )
}
