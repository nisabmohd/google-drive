import React from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { Box } from '@mui/system';

export const Cardc = (props) => {
  return (
    <a href={`/${props.link}`} target="_blank" rel="noreferrer" style={{textDecoration:'none',color:'inherit'}}> 
      <Box className='card' sx={{ border: 1, borderColor: 'divider' }} style={{ width: '234px', height: '150px', borderRadius: '5px', display: 'flex', flexDirection: 'column', marginRight: '13px', marginTop: '19px' }}>
        <div href={props.url} className='card' style={{ position: 'relative', background: `url(${props.url})`, overflow: 'hidden', height: '75%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={props.img} alt="" />
        </div>
        <div className='folder' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '234px', height: '39px', marginRight: '13px', marginTop: '3px' }}>
          <ImageIcon style={{ width: '20px', marginLeft: '9px' }} /> <h5 style={{ marginLeft: '9px', color: 'inherit' }}>{props.name}</h5>
        </div>
      </Box>
    </a>
  )
}
