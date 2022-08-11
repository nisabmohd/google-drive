import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
export const Folder = () => {
  return (
    <div className='folder' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', width: '234px', height: '39px', border: '1.5px solid #E7E7ED', borderRadius: '5px', marginRight: '13px', marginTop: '15px' }}>
      <FolderIcon style={{ width: '20px', marginLeft: '9px' }} /> <h5 style={{ marginLeft: '9px' }}>Farewell 2k21</h5>
    </div>
  )
}
