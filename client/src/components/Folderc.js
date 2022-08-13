import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
export const Folderc = ({name,id}) => {
  return (
    <Link to={`/mydrive?folderid=${id}`} style={{textDecoration:'none',color:'inherit'}}> 
    <Box sx={{ border: 1 ,borderColor: 'divider'}}  className='folder' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '234px', height: '39px',borderRadius: '5px', marginRight: '13px', marginTop: '5px' }}>
      <FolderIcon style={{ width: '20px', marginLeft: '9px' }} /> <p style={{ marginLeft: '9px',color:'inherit' }}>{name}</p>
    </Box>
    </Link>
  )
}
