import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
export const Folderc = ({name}) => {
  return (
    <Box sx={{ border: 1 ,borderColor: 'divider'}}  className='folder' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '234px', height: '39px',borderRadius: '5px', marginRight: '13px', marginTop: '5px' }}>
      <FolderIcon style={{ width: '20px', marginLeft: '9px' }} /> <h5 style={{ marginLeft: '9px',color:'inherit' }}>{name}</h5>
    </Box>
  )
}
