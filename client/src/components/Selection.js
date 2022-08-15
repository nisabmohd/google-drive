import React from 'react'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { Box } from '@mui/material';

export const Selection = (props) => {
  return (
    <Box className='selection' sx={{ borderBottom: 0.5, borderColor: 'divider' }} style={{ width: "100%", height: '59px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '19px', textTransform: 'capitalize' }}>{props.value}
      {
        !props.grid ?
          <GridViewIcon onClick={() => props.setGrid()} style={{ marginLeft: 'auto', marginRight: '19px', width: '20px', height: '22px', cursor: 'pointer' }} /> :
          <FormatListBulletedIcon onClick={() => props.setGrid(!props.grid)} style={{ marginLeft: 'auto', marginRight: '19px', width: '20px', height: '22px', cursor: 'pointer' }} />
      }

    </Box>
  )
}
